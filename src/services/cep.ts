import { CepResponse, Address, CepError } from '../model/cep';

export class CepService {
  private static readonly BASE_URL = 'https://viacep.com.br/ws';
  private static readonly TIMEOUT = 5000;

  static async fetchAddress(cep: string): Promise<Address> {
    const cleanCep = this.sanitizeCep(cep);
    
    if (!this.isValidCep(cleanCep)) {
      throw new CepError({
        message: 'CEP deve conter exatamente 8 dígitos numéricos',
        type: 'invalid'
      });
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

      const response = await fetch(`${this.BASE_URL}/${cleanCep}/json/`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new CepError({
          message: 'Erro na consulta do CEP',
          type: 'network'
        });
      }

      const data: CepResponse = await response.json();
      
      if (data.erro) {
        throw new CepError({
          message: 'CEP não encontrado',
          type: 'not_found'
        });
      }

      return this.mapCepResponseToAddress(data);
    } catch (error: any) {
      if (error instanceof CepError) {
        throw error;
      }
      
      if (error.name === 'AbortError') {
        throw new CepError({
          message: 'Timeout na consulta do CEP',
          type: 'network'
        });
      }

      throw new CepError({
        message: 'Erro de conexão ao consultar CEP',
        type: 'network'
      });
    }
  }

  private static sanitizeCep(cep: string): string {
    return cep.replace(/\D/g, '');
  }

  private static isValidCep(cep: string): boolean {
    return /^\d{8}$/.test(cep);
  }

  private static mapCepResponseToAddress(response: CepResponse): Address {
    return {
      cep: response.cep,
      street: response.logradouro,
      district: response.bairro,
      city: response.localidade,
      uf: response.uf,
    };
  }
}

// Factory function for easier testing and mocking
export const cepService = {
  fetchAddress: (cep: string) => CepService.fetchAddress(cep),
}; 
export interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export interface Address {
  cep: string;
  street: string;
  district: string;
  city: string;
  uf: string;
}

export class CepError extends Error {
  public readonly type: 'network' | 'not_found' | 'invalid';

  constructor(config: { message: string; type: 'network' | 'not_found' | 'invalid' }) {
    super(config.message);
    this.name = 'CepError';
    this.type = config.type;
  }
}

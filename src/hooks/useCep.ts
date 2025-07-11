import { useState, useCallback } from 'react';
import { Address, CepError } from '../model/cep';
import { cepService } from '../services/cep';

interface UseCepState {
  loading: boolean;
  error: string | null;
  address: Address | null;
}

interface UseCepReturn extends UseCepState {
  fetchAddress: (cep: string) => Promise<Address | null>;
  clearError: () => void;
  reset: () => void;
}

export const useCep = (): UseCepReturn => {
  const [state, setState] = useState<UseCepState>({
    loading: false,
    error: null,
    address: null,
  });

  const fetchAddress = useCallback(async (cep: string): Promise<Address | null> => {
    if (!cep || cep.length < 8) {
      return null;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const address = await cepService.fetchAddress(cep);
      
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        address, 
        error: null 
      }));
      
      return address;
    } catch (error) {
      const errorMessage = error instanceof CepError 
        ? error.message 
        : 'Erro desconhecido ao consultar CEP';
      
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage,
        address: null 
      }));
      
      return null;
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      address: null,
    });
  }, []);

  return {
    ...state,
    fetchAddress,
    clearError,
    reset,
  };
}; 
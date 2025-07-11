import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email inválido')
    .required('Informe o email'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Informe a senha'),
}); 
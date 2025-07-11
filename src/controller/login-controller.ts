import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../model/user';

/**
 * Realiza o login do usuário.
 * @param email Email do usuário
 * @param password Senha do usuário
 * @returns User autenticado ou string de erro
 */
export async function login(email: string, password: string): Promise<User | string> {
  const storedUsers = await AsyncStorage.getItem('users');
  const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
  const userFound = users.find(user => user.email === email);

  if (!userFound) return 'Email não cadastrado.';
  if (userFound.password !== password) return 'Senha incorreta.';

  await AsyncStorage.setItem('currentUser', JSON.stringify(userFound));
  return userFound;
}

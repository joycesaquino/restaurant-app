import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../model/user';

export async function addUser(user: User): Promise<string | void> {
  const stored = await AsyncStorage.getItem('users');
  const users: User[] = stored ? JSON.parse(stored) : [];
  if (users.find(u => u.email === user.email)) {
    return 'Email já cadastrado.';
  }
  users.push(user);
  await AsyncStorage.setItem('users', JSON.stringify(users));
}

export async function getUsers(): Promise<User[]> {
  const stored = await AsyncStorage.getItem('users');
  return stored ? JSON.parse(stored) : [];
}

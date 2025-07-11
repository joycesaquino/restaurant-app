import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../model/products';

export async function addProduct(product: Product): Promise<void> {
  const stored = await AsyncStorage.getItem('products');
  const products: Product[] = stored ? JSON.parse(stored) : [];
  products.push(product);
  await AsyncStorage.setItem('products', JSON.stringify(products));
}

export async function getProducts(): Promise<Product[]> {
  const stored = await AsyncStorage.getItem('products');
  return stored ? JSON.parse(stored) : [];
}

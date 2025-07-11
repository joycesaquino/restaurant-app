import AsyncStorage from '@react-native-async-storage/async-storage';
// Importe o model Restaurant quando existir
// import { Restaurant } from '../model/restaurant';

type Restaurant = {
  id: string;
  name: string;
  address: string;
  // Adicione outros campos conforme necessário
};

export async function addRestaurant(restaurant: Restaurant): Promise<void> {
  const stored = await AsyncStorage.getItem('restaurants');
  const restaurants: Restaurant[] = stored ? JSON.parse(stored) : [];
  restaurants.push(restaurant);
  await AsyncStorage.setItem('restaurants', JSON.stringify(restaurants));
}

export async function getRestaurants(): Promise<Restaurant[]> {
  const stored = await AsyncStorage.getItem('restaurants');
  return stored ? JSON.parse(stored) : [];
}

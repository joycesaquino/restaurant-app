import AsyncStorage from '@react-native-async-storage/async-storage';

type Restaurant = {
  id: string;
  name: string;
  address: string;
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

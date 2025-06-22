import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/login';
import Home from './src/pages/home';
import UserRegistration from './src/pages/user-registration';
import ProductRegistration from './src/pages/product-registration';
import MenuList from './src/pages/menu-list';
import RestaurantRegistration from './src/pages/restaurant-registration';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Entre na tela inicial' }}
          />

          <Stack.Screen
            name="ProductRegistration"
            component={ProductRegistration}
            options={{ title: 'Cadastre um produto' }}
          />

          <Stack.Screen
            name="UserRegistration"
            component={UserRegistration}
            options={{ title: 'Cadastre um usuário' }}
          />

          <Stack.Screen
            name="MenuList"
            component={MenuList}
            options={{ title: 'Lista de cardápio' }}
          />

          <Stack.Screen
            name="RestaurantRegistration"
            component={RestaurantRegistration}
            options={{ title: 'Cadastro de restaurante' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

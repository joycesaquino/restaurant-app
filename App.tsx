import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/view/pages/login';
import Home from './src/view/pages/home';
import UserRegistration from './src/view/pages/user-registration';
import ProductRegistration from './src/view/pages/product-registration';
import ProductSuccess from './src/view/pages/success';
import MenuList from './src/view/pages/menu-list';
import RestaurantRegistration from './src/view/pages/restaurant-registration';
import Onboarding from './src/view/pages/onboarding';
import { theme } from './src/theme/theme';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />

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
            name="ProductSuccess"
            component={ProductSuccess}
            options={{ title: 'Cadastro Concluído', headerBackVisible: false }}
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

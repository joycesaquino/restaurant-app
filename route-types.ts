export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  UserRegistration: undefined;
  ProductRegistration: undefined;
  ProductSuccess: {
    type: 'product' | 'restaurant'| 'user';
    title?: string;
    message?: string;
  };
  MenuList: undefined;
  RestaurantRegistration: undefined;
  Onboarding: undefined;
};
import { MD3Theme, MD3LightTheme as DefaultTheme, } from 'react-native-paper';

export const theme: MD3Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
    fonts: {
      ...DefaultTheme.fonts,
      bodySmall: {
        ...DefaultTheme.fonts.bodySmall,
      },
      bodyMedium: {
        ...DefaultTheme.fonts.bodyMedium,
      },
      bodyLarge: {
        ...DefaultTheme.fonts.bodyLarge,
      },
    },
  };
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Appearance, Platform } from 'react-native';
import { ThemeProvider } from 'styled-components';

import Firebase from './src/api/firebase';
import theme from './src/components/theme';
import Screens from './src/Screens';

const Cluey = () => {
  const [loaded] = useFonts({
    'Nunito': require('./assets/fonts/Nunito/static/Nunito-Regular.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito/static/Nunito-Medium.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito/static/Nunito-SemiBold.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito/static/Nunito-Bold.ttf'),
    'Nunito-ExtraBold': require('./assets/fonts/Nunito/static/Nunito-ExtraBold.ttf'),
  });

  if (!loaded) {
    return null;
  };

  const deviceOS = Platform.OS;

  const deviceTheme = Appearance.getColorScheme();
  //const AppTheme = theme[deviceTheme] || theme.light;
  const AppTheme = theme.light;

  return (
    <Firebase>
      <StatusBar style='dark'/>
      <ThemeProvider theme={AppTheme}>
        <Screens />
      </ThemeProvider>
    </Firebase>
  );
};

export default Cluey;
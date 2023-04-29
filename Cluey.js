import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Appearance, Platform, AppRegistry } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { MenuProvider } from 'react-native-popup-menu';

import Firebase from './src/api/firebase';
import { BotProvider } from './src/api/chatbot';
import { LocaleProvider } from './src/components/locale';
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
    <LocaleProvider>
      <Firebase>
        <BotProvider>
          <StatusBar style='dark'/>
          <ThemeProvider theme={AppTheme}>
            <MenuProvider>
              <Screens />
            </MenuProvider>
          </ThemeProvider>
        </BotProvider>
      </Firebase>
    </LocaleProvider>
  );
};

export default Cluey;
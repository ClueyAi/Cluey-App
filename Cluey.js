import React from 'react';
import { useFonts } from 'expo-font';
import { MenuProvider } from 'react-native-popup-menu';

import {ThemeProvider} from './src/components/theme';
import {Firebase} from './src/api/firebase';
import {BotProvider} from './src/api/chatbot';
import {LocaleProvider} from './src/components/locale';
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
  }

  return (
    <LocaleProvider>
      <Firebase>
        <BotProvider>
          <ThemeProvider>
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
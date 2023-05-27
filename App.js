import React from 'react';
import { useFonts } from 'expo-font';
import { MenuProvider } from 'react-native-popup-menu';

import {LocaleProvider} from './src/components/locale';
import {Firebase} from './src/api/firebase';
import {ProvidersProvider} from './src/api/providers';
import {ThemeProvider} from './src/components/theme';
import Screens from './src/Screens';

const App = () => {
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
        <ProvidersProvider>
          <ThemeProvider>
            <MenuProvider>
              <Screens/>
            </MenuProvider>
          </ThemeProvider>
        </ProvidersProvider>
      </Firebase>
    </LocaleProvider>
  );
};

export default App;
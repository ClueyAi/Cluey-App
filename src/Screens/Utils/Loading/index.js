import React, { useState, useEffect, useContext } from 'react';
import { ImageBackground } from 'react-native';
import PropTypes from "prop-types";

import { ActivityIndicator, Container, Body, H1Mini } from '../../../components/styles';
import { UserContext, AuthContext } from '../../../api/firebase';
import { LocaleContext } from '../../../components/locale';
import { ThemeContext } from '../../../components/theme';

const Load = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  const {user, isAuth} = useContext(UserContext);
  const {isNew} = useContext(AuthContext);
  const [loadingMsg] = useState(locale.loading.loading);
  const [loadedMsg, setLoadedMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [screen, setScreen] = useState(null);
  const [route, setRoute] = useState(null);
  
  const selectScreen = async () => {
    if (isAuth) {
      const emailName = user?.email?.split('@')[0];
      const currentUser = user?.displayName?user?.displayName:emailName;
      const msg = user?locale.loading.welcome_user+currentUser:locale.loading.welcome_back;
      setLoadedMsg(msg);
      if (!user?.emailVerified) {
        setScreen('AuthStackNavigator');
        setRoute('Verify');
      }
      setScreen('AppStackNavigator');
    } else {
        if (!isNew) {
          setLoadedMsg(locale.loading.welcome_back);
          setRoute('Current');
        } else {
          setLoadedMsg(locale.loading.welcome);
        }
      setScreen('AuthStackNavigator');
    }
  };

  useEffect(() => {
    selectScreen();
    setIsLoading(false);
    const timer = setTimeout(() => {
      if (!isLoading) {
        navigation.navigate(screen, { screen: route });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [ screen, selectScreen, navigation ]);

  return (
    isLoading ? 
    <Container>
      <Body style={{backgroundColor: theme.primary}}>
        <H1Mini style={{width: '95%'}}>{loadingMsg}</H1Mini>
        <ImageBackground
          style={{width: 165, height: 278}}
          source={require('../../../../assets/images/cluey-blank.png')}
        >
          <ActivityIndicator
            style={{marginTop: 105, transform: [{ scaleX: 2 }, { scaleY: 2 }]}}
            size="large"
            color={theme.primary}
          />
        </ImageBackground>
      </Body>
    </Container>
  : 
  <Container>
      <Body style={{backgroundColor: theme.primary}}>
        <H1Mini style={{width: '95%'}}>{loadedMsg}</H1Mini>
        <ImageBackground
          style={{width: 165, height: 278}}
          source={require('../../../../assets/images/cluey.png')}
        >
          </ImageBackground>
      </Body>
    </Container>
  );
};

Load.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Load;

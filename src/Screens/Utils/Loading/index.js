import React, { useState, useEffect, useContext } from 'react';
import { ImageBackground } from 'react-native';
import PropTypes from "prop-types";

import { ActivityIndicator, Container, Body, H1Mini } from '../../../components/styles';
import { UserContext, AuthContext, FirestoreContext } from '../../../api/firebase';
import { LocaleContext } from '../../../components/locale';
import { ThemeContext } from '../../../components/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Load = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  const {isAuth, isVerify} = useContext(UserContext);
  const {user, app} = useContext(FirestoreContext);
  const {isNew, signOut} = useContext(AuthContext);
  const [loadingMsg] = useState(locale.loading.loading);
  const [loadedMsg, setLoadedMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [screen, setScreen] = useState(null);
  const [route, setRoute] = useState(null);

  const profile = user?.profile;
  
  const selectScreen = async () => {
    if (isAuth) {
      const emailName = profile?.email.split('@')[0];
      const currentName = profile?.displayName?profile?.displayName:emailName;
      const msg = await profile?locale.loading.welcome_user+currentName:locale.loading.welcome_back;
      setLoadedMsg(msg);
      if (!isVerify) {
        setScreen('AuthStackNavigator');
        setRoute('Verify'); 
      } else if (isVerify && !user?.preferences) {
        setScreen('AuthStackNavigator');
        setRoute('Preferences');
      } else {
        setScreen('AppStackNavigator');
        setRoute('Home');
      }
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
    setIsDone(true);
    if (app?.logoutAll) {
      AsyncStorage.clear();
      signOut();
      navigation.navigate('AuthStackNavigator', { screen: 'Welcome' });
    }
    const timer = setTimeout(() => {
      if (isDone) {
        setIsLoading(false);
        const timer = setTimeout(() => {
          if (!isLoading) {
            navigation.navigate(screen, { screen: route });
          }
        }, 500);
        return () => clearTimeout(timer);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [ screen, selectScreen, navigation ]);

  return (
    isLoading ? 
    <Container>
      <Body style={{backgroundColor: theme.primary}}>
        <H1Mini style={{width: '95%', marginTop: 50}}>{loadingMsg}</H1Mini>
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
          style={{width: 151, height: 220, marginTop: 20}}
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

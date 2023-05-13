import React, { useState, useEffect, useContext } from 'react';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from "prop-types";

import { ActivityIndicator, Container, Body, H1Mini } from '../../../components/styles';
import { UserContext, AuthContext, FirestoreContext } from '../../../api/firebase';
import { LocaleContext } from '../../../components/locale';
import { ThemeContext } from '../../../components/theme';

const Load = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  const {user, isAuth, isVerify} = useContext(UserContext);
  const {thisUser, hasThisUser, preferences, hasPreferences} = useContext(FirestoreContext);
  const {isNew} = useContext(AuthContext);
  const [loadingMsg] = useState(locale.loading.loading);
  const [loadedMsg, setLoadedMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [screen, setScreen] = useState(null);
  const [route, setRoute] = useState(null);
  
  const selectScreen = async () => {
    if (isAuth) {
      //console.log(preferences);
      //console.log(hasPreferences);
      const emailName = thisUser?.email?.split('@')[0];
      const currentUser = thisUser?.displayName?thisUser?.displayName:emailName;
      const msg = await thisUser?locale.loading.welcome_user+currentUser:locale.loading.welcome_back;
      setLoadedMsg(msg);
      if (!isVerify) {
        setScreen('AuthStackNavigator');
        setRoute('Verify'); 
      } else if (isVerify && thisUser?.preferences == undefined) {
        setScreen('AuthStackNavigator');
        setRoute('Custom');
      } else {
        setScreen('AppStackNavigator');
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
    //AsyncStorage.clear();
    selectScreen();
    setIsDone(true);
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

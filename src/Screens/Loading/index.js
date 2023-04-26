import React, { useState, useEffect, useContext } from 'react';
import { ImageBackground } from 'react-native';
import { ActivityIndicator, Container, Body, Main, Heading, Image, H1Mini } from '../../components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../api/firebase';
import locale from '../../components/locale';


const Load = ({ navigation }) => {
  const [data] = useState(locale.loading);
  const [loadingMsg] = useState(data.loading);
  const [loadedMsg, setLoadedMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [screen, setScreen] = useState(null);
  const [route, setRoute] = useState(null);
  const { user, isAuth } = useContext(UserContext);

  const selectScreen = async () => {
    if (isAuth) {
      const emailName = user?.email?.split('@')[0];
      const currentUser = user?.displayName?user?.displayName:emailName;
      const msg = user?data.welcome_user+currentUser:data.welcome_back;
      setLoadedMsg(msg);
      AsyncStorage.setItem('isNewUser', 'false');
      setScreen('AuthStackNavigator');
      user?.emailVerified?null:setRoute('Verify');
    } else {
      AsyncStorage.getItem('isNewUser').then((value) => {
        if (value === 'false') {
          setLoadedMsg(data.welcome_back);
          setRoute('SignIn');
        } else {
          setLoadedMsg(data.welcome);
        };
      });
      setScreen('AuthStackNavigator');
    };
  };

  useEffect(() => {
    selectScreen();
    setIsLoading(false);
    const timer = setTimeout(() => {
      if (!isLoading) {
        navigation.navigate(screen, { screen: route });
      };
    }, 1500);
    return () => clearTimeout(timer);
  }, [ screen, selectScreen, navigation ]);

  return (
    isLoading ? 
    <Container>
      <Body style={{backgroundColor: '#FFBF00'}}>
        <H1Mini style={{width: '95%'}}>{loadingMsg}</H1Mini>
        <ImageBackground
          style={{width: 165, height: 278}}
          source={require('../../../assets/images/cluey-blank.png')}
        >
          <ActivityIndicator
            style={{marginTop: 105, transform: [{ scaleX: 2 }, { scaleY: 2 }]}}
            size="large"
            color="#FFBF00"
          />
        </ImageBackground>
      </Body>
    </Container>
  : 
  <Container>
      <Body style={{backgroundColor: '#FFBF00'}}>
        <H1Mini style={{width: '95%'}}>{loadedMsg}</H1Mini>
        <ImageBackground
          style={{width: 165, height: 278}}
          source={require('../../../assets/images/cluey.png')}
        >
          </ImageBackground>
      </Body>
    </Container>
  );
};

export default Load;
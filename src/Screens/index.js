import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator } from '@react-navigation/compat';

import Loading from './Loading';
import AuthStackNavigator from './Auth';
import AppStackNavigator from './App';
import OthersStackNavigator from './Others';
import About from './Utils/About';
import Rules from './Utils/Rules';

const SwitchNavigator = createSwitchNavigator(
  {
    Loading: Loading,
    AuthStackNavigator: AuthStackNavigator,
    AppStackNavigator: AppStackNavigator,
    OthersStackNavigator: OthersStackNavigator,
    About: About,
    Rules: Rules,
  }
);

const Screens = () => {
  return (
    <NavigationContainer>
      <SwitchNavigator/>
    </NavigationContainer>
  )
};

export default Screens;
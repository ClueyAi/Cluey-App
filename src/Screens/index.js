import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator } from '@react-navigation/compat';

import Loading from './Utils/Loading';
import About from './Utils/About';
import Rules from './Utils/Rules';
import AuthStackNavigator from './Auth';
import AppStackNavigator from './App';
import OthersStackNavigator from './Others';

const SwitchNavigator = createSwitchNavigator(
  {
    Loading: Loading,
    About: About,
    Rules: Rules,
    AuthStackNavigator: AuthStackNavigator,
    AppStackNavigator: AppStackNavigator,
    OthersStackNavigator: OthersStackNavigator,
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
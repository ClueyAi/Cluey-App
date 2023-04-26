import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator } from '@react-navigation/compat';

import Loading from './Loading';
import AuthStackNavigator from './Auth';
import AppStackNavigator from './App';
import UltilsStackNavigator from './Utils';
import OthersStackNavigator from './Others';

const SwitchNavigator = createSwitchNavigator(
  {
    Loading: Loading,
    AuthStackNavigator: AuthStackNavigator,
    AppStackNavigator: AppStackNavigator,
    UltilsStackNavigator: UltilsStackNavigator,
    OthersStackNavigator: OthersStackNavigator,
  }
);

const Screens = () => {
  return (
    <NavigationContainer >
      <SwitchNavigator />
    </NavigationContainer>
  )
};

export default Screens;
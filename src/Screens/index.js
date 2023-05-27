import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Loading from './Utils/Loading';
import Test from './Others/Test';
import AuthStackNavigator from './Auth';
import AppStackNavigator from './App';
import OthersStackNavigator from './Others';

const Stack = createStackNavigator();

const Screens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="AuthStackNavigator" component={AuthStackNavigator} />
        <Stack.Screen name="AppStackNavigator" component={AppStackNavigator} />
        <Stack.Screen name="OthersStackNavigator" component={OthersStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;

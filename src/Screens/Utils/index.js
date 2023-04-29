import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from '@expo/vector-icons/Ionicons';

import About from './About';
import Rules from './Rules';

const UtilsStack = createStackNavigator();

const Utils = () => {
  return (
    <UtilsStack.Navigator screenOptions={{
      headerStyle: {
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity:  0.10,
        shadowRadius: 1.51,
        elevation: 4
      },
      headerBackTitleVisible: true,
      headerTitleAlign: 'center',
      headerLeft: () => <Ionicons name="chevron-back" size={28} color="#FFBF00"/>,
      headerTintColor: '#FFBF00',
      headerBackTitleVisible: false,
    }}>
      <UtilsStack.Screen name="About" component={About}/>
      <UtilsStack.Screen name="Rules" component={Rules}/>
    </UtilsStack.Navigator>
  );
};

export default Utils;
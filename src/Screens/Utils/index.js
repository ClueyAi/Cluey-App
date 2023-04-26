import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import About from './About'
import Rules from './Rules'

const UtilsStack = createStackNavigator()

const Utils = () => {
  return (
    <UtilsStack.Navigator screenOptions={{headerShown: false}}>
      <UtilsStack.Screen name="About" component={About} />
      <UtilsStack.Screen name="Rules" component={Rules} />
    </UtilsStack.Navigator>
  )
}

export default Utils
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Blank from './Blank'
import Test from './Test'

const OthersStack = createStackNavigator()

const Others = () => {
  return (
    <OthersStack.Navigator screenOptions={{headerShown: false}} initialRouteName='Test'>
      <OthersStack.Screen name="Blank" component={Blank} />
      <OthersStack.Screen name="Test" component={Test} />
    </OthersStack.Navigator>
  )
}

export default Others
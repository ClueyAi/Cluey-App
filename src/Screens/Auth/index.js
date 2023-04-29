import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import { LanguageSelector, LogoutButton } from '../../components/tools';

import Welcome from './Welcome';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Forgot from './Forgot';
import Verify from '../Auth/Verify';
import Custom from '../Auth/Custom';

const AuthStack = createStackNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
        options={() => ({
          headerRight: () => <LanguageSelector/>,
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
        })}
      />
      <AuthStack.Screen name="SignIn" component={SignIn}/>
      <AuthStack.Screen name="SignUp" component={SignUp}/>
      <AuthStack.Screen name="Forgot" component={Forgot}/>
      <AuthStack.Screen
        name="Verify"
        component={Verify}
        options={({navigation}) => ({
          headerRight: () => <LogoutButton navigation={navigation}/>,
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
        })}
      />
      <AuthStack.Screen name="Custom" component={Custom}/>
    </AuthStack.Navigator>
  );
};

export default Auth;
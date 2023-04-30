import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from '@expo/vector-icons/Ionicons';

import { LanguageSelector, LogoutButton } from '../../components/tools';

import Welcome from './Welcome';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Forgot from './Forgot';
import Verify from './Verify';
import Custom from './Custom';

const AuthStack = createStackNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator screenOptions={{
      headerStyle: {
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity:  0.10,
        shadowRadius: 1.51,
        elevation: 4
      },
      headerRight: () => <LanguageSelector/>,
      headerShadowVisible: false,
      headerTitle: '',
      headerBackTitleVisible: true,
      headerBackImage: () => <Ionicons name="chevron-back" size={28} color="#FFBF00"/>,
      headerTintColor: '#FFBF00',
    }}>
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
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
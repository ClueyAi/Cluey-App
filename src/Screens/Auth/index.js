import React from 'react';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { isAndroid } from '@freakycoder/react-native-helpers';
import Ionicons from '@expo/vector-icons/Ionicons';

import { LanguageSelector, LogoutButton, AboutButton, CloseModal } from '../../components/tools';

import New from './New';
import Welcome from './New/Welcome';
import SignIn from './New/SignIn';
import Current from './Current';
import SignUp from './Current/SignUp';
import Forgot from './Forgot';
import Verify from './Verify';

import Preferences from '../Utils/Preferences';
import About from '../Utils/About';
import Rules from '../Utils/Rules';

const AuthStack = createStackNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator screenOptions={({navigation}) => ({
      gestureEnabled: true,
      headerRight: () => <LanguageSelector/>,
      headerLeft: () => <AboutButton navigation={navigation}/>,
      headerShadowVisible: false,
      headerTitle: '',
      headerBackTitleVisible: true,
      headerBackImage: () => <Ionicons name="chevron-back" size={28} color="#FFBF00"/>,
      headerTintColor: '#FFBF00',
    })}>
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
      />
      <AuthStack.Screen name="New" component={New}/>
      <AuthStack.Screen name="Current" component={Current}/>
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
      <AuthStack.Screen
        name="Preferences"
        component={Preferences}
        options={() => ({
          headerLeft: null,
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
        })}
      />
      <AuthStack.Group screenOptions={{
        headerLeft: null,
        headerRight: null,
        headerTitle: () => <CloseModal/>,
        headerShadowVisible: true,
        headerStyle: {
          height: 40,
          shadowColor: "#000",
          shadowOffset: {width: 0, height: 1},
          shadowOpacity:  0.10,
          shadowRadius: 1.51,
          elevation: 4
        },
        headerTitleAlign: 'center',
        presentation: 'modal',
        ...( isAndroid && TransitionPresets.ModalPresentationIOS )
      }}>
        <AuthStack.Screen name="SignIn" component={SignIn}/>
        <AuthStack.Screen name="SignUp" component={SignUp}/>
        <AuthStack.Screen name="Forgot" component={Forgot}/>
        <AuthStack.Screen name="About" component={About}/>
        <AuthStack.Screen name="Rules" component={Rules}/>
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

export default Auth;
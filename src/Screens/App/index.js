import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from '@expo/vector-icons/Ionicons';

import { LogoutButton , SettingsButton } from '../../components/tools';

import Home from './Home';
// Settings
import Settings from './Settings';
import ChangeEmail from './Settings/Components/changeEmail';
import ChangePassword from './Settings/Components/changePassword';
import Country from './Settings/Components/country';
import Preferences from './Settings/Components/preferences';

const AppStack = createStackNavigator();

const App = () => {
  return (
    <AppStack.Navigator screenOptions={{
      headerStyle: {
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity:  0.10,
        shadowRadius: 1.51,
        elevation: 4
      },
      headerBackTitleVisible: true,
      headerTitleAlign: 'center',
      headerBackImage: () => <Ionicons name="chevron-back" size={28} color="#FFBF00"/>,
      headerTintColor: '#FFBF00',
    }}>
      <AppStack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerRight: () => <SettingsButton navigation={navigation} />,
          headerTitle: 'Cluey',
          headerTitleAlign: 'left',
          headerTintColor: '#FFBF00',
          headerTitleStyle: {
          fontFamily: 'Nunito-Bold',
          fontSize: 24,
          },
        })}
      />
      {/* Settings */}
      <AppStack.Screen 
        name="Settings" 
        component={Settings}
        options={({navigation}) => ({
          headerRight: () => <LogoutButton navigation={navigation}/>,
          headerTintColor: '#FFBF00',
          headerTitleStyle: {
          fontFamily: 'Nunito-Bold',
          fontSize: 24,
          },
        })}
      />
      <AppStack.Screen name="ChangeEmail" component={ChangeEmail} options={{headerTitle: 'Change Email', presentation: 'modal'}}/>
      <AppStack.Screen name="ChangePassword" component={ChangePassword} options={{headerTitle: 'Change Password', presentation: 'modal'}}/>
      <AppStack.Screen name="Country" component={Country} options={{presentation: 'modal'}}/>
      <AppStack.Screen name="Preferences" component={Preferences} options={{presentation: 'modal'}}/>
    </AppStack.Navigator>
  );
};

export default App;
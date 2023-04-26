import React from 'react';
import { View, Text } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import CustomMenu from './Components/menuPopup';

export default function MyComponent() {

  const handlePressDelete = () => {
    console.log('Delete Pressed');
  };

  const handlePressEdit = () => {
    console.log('Edit Pressed');
  };

  return (
    <View>
        <Text>My Text</Text>
        <MenuProvider>
        <CustomMenu onPressDelete={handlePressDelete} onPressEdit={handlePressEdit} />
    </MenuProvider>
      </View>
  );
}

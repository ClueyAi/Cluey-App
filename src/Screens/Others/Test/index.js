import React from 'react';
import { View, Text } from 'react-native';
import CustomMenu from './Components/menuPopup';

const MyComponent = () => {

  const handlePressDelete = () => {
    console.log('Delete Pressed');
  };

  const handlePressEdit = () => {
    console.log('Edit Pressed');
  };

  return (
    <View>
        <Text>My Text</Text>
        <CustomMenu onPressDelete={handlePressDelete} onPressEdit={handlePressEdit} />
      </View>
  );
};

export default MyComponent;

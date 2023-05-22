import React from 'react';
import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-popup-menu';

const CustomMenu = ({ onPressDelete, onPressEdit }) => {
  let _menu = null;

  const hideMenu = () => _menu.hide();
  const showMenu = () => _menu.show();

  const onPressDeleteWrapper = () => {
    hideMenu();
    onPressDelete();
  }

  const onPressEditWrapper = () => {
    hideMenu();
    onPressEdit();
  }

  return (
    <View style={{ flex: 1 }}>
      <Menu
        ref={(ref) => (_menu = ref)}
        button={
          <Text onPress={showMenu}>Open Menu</Text>
        }
      >
        <MenuItem onPress={onPressDeleteWrapper}>Delete</MenuItem>
        <MenuDivider />
        <MenuItem onPress={onPressEditWrapper}>Edit</MenuItem>
      </Menu>
    </View>
  );
};

export default CustomMenu;

import React, { useRef} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import { Ionicons, Entypo } from '@expo/vector-icons';

const MenuDrop = ({ children , data }) => {
  const menuRef = useRef(null);

  const openMenu = () => {
    menuRef.current.open();
  };

  return (
    <View style={styles.contianer}>
      <TouchableWithoutFeedback onLongPress={openMenu}>
        <View >
          {children}
          <Menu ref={menuRef} style={styles.menu}>
            <MenuTrigger/>
            <MenuOptions>
              <Pin data={data}/>
              <Copy data={data}/>
              <Share data={data}/>
              <Delete data={data}/>
            </MenuOptions>
          </Menu>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const Pin = ({ data }) => (
  <MenuOption
    onSelect={() => alert(data.id)}
    style={styles.pin}
  >
    <Entypo name="key" size={24} color="#000" />
  </MenuOption>
 );

 const Copy = ({ data }) => (
  <MenuOption
    onSelect={() => alert(data.senderName)}
    style={styles.copy}
  >
    <Entypo name="help" size={24} color="#000" />
  </MenuOption>
 );
 const Share = ({ data }) => (
  <MenuOption
    onSelect={() => alert(data.text)}
    style={styles.share}
  >
    <Entypo name="help" size={24} color="#000" />
  </MenuOption>
 );
 const Delete = ({ data }) => (
  <MenuOption
    onSelect={() => alert(data.createdAt)}
    style={styles.delete}
  >
    <Entypo name="help" size={24} color="#000" />
  </MenuOption>
 );

 const styles = StyleSheet.create({
  contianer: {
    position: 'relative',
    top: 0,
    right: 0,
  },
  menu: {
    position: 'absolute',
    bottom: 230,
    right: 0,
  },
  pin: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  copy: {
    position: 'absolute',
  },
  share: {
    position: 'absolute',
  },
  delete: {
    position: 'absolute',
  }
});

export default MenuDrop;
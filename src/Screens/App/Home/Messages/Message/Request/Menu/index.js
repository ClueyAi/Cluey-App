import React, { useRef} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';

import PropTypes from "prop-types";

import { Ionicons, Entypo } from '@expo/vector-icons';

const RequestMenu = ({ children , data }) => {
  const menuRef = useRef(null);

  const openMenu = () => {
    //menuRef.current.open();
  };

  return (
    <TouchableWithoutFeedback onLongPress={openMenu}>
      <View >
        {children}
        <Menu ref={menuRef}>
          <MenuTrigger/>
          <MenuOptions style={styles.menu}>
            <Pin data={data}/>
            <Copy data={data}/>
            <Share data={data}/>
            <Delete data={data}/>
          </MenuOptions>
        </Menu>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Pin = ({ data }) => (
  <MenuOption
    onSelect={() => alert(data.id)}
    style={{...styles.option, ...styles.pin}}
  >
    <Entypo name="pin" size={32} color="#0000FF" />
  </MenuOption>
 );

 const Copy = ({ data }) => (
  <MenuOption
    onSelect={() => alert(data.senderName)}
    style={{...styles.option, ...styles.copy}}
  >
    <Ionicons name="copy-outline" size={32} color="#FFBF00" />
  </MenuOption>
 );
 const Share = ({ data }) => (
  <MenuOption
    onSelect={() => alert(data.text)}
    style={{...styles.option, ...styles.share}}
  >
    <Entypo name="share" size={32} color="#00FF00" />
  </MenuOption>
 );
 const Delete = ({ data }) => (
  <MenuOption
    onSelect={() => alert(data.createdAt)}
    style={{...styles.option, ...styles.delete}}
  >
    <Ionicons name="backspace-outline" size={32} color="#FF0000" />
  </MenuOption>
 );

 const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
  option: {
    padding: 10,
    backgroundColor: '#222222',
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {width: 2, height: 2},
    shadowOpacity:  0.37,
    shadowRadius: 4.05,
    elevation: 4
  },
  pin: {
    
  },
  copy: {
    
  },
  share: {
    
  },
  delete: {
    
  }
});

RequestMenu.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired
};

Pin.propTypes = {
  data: PropTypes.object.isRequired
};

Copy.propTypes = {
  data: PropTypes.object.isRequired
};

Share.propTypes = {
  data: PropTypes.object.isRequired
};

Delete.propTypes = {
  data: PropTypes.object.isRequired
};

export default RequestMenu;
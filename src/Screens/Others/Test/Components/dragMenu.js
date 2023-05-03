import React, { useState } from 'react';
import { View, Text, PanResponder, StyleSheet } from 'react-native';

const Menu = () => {
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handlePanResponderMove = (event, gesture) => {
    setMenuPosition({
      x: gesture.moveX - 50, // 50 é metade da largura do menu
      y: gesture.moveY - 50, // 50 é metade da altura do menu
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={[styles.menu, { left: menuPosition.x, top: menuPosition.y }]}>
        <Text>Opção 1</Text>
        <Text>Opção 2</Text>
        <Text>Opção 3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    position: 'absolute',
    width: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default Menu;

import React, { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MenuItem = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuItemLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const ActionMenu = ({ visible, onPress, options }) => {
  if (!visible) return null;

  return (
    <View style={styles.actionMenu}>
      {options.map((option, index) => (
        <MenuItem key={index} label={option.label} onPress={option.onPress} />
      ))}
    </View>
  );
};

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const menuRef = useRef(null);


  const handlePressIn = () => {
    setMenuVisible(true);
  };

  const handlePressOut = () => {
    setMenuVisible(false);
    if (selectedOption) {
      selectedOption.onPress();
    } else {
      options[0].onPress(); // seleciona a opção "Cancel" por padrão
    }
    setSelectedOption(null);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleMove = (event) => {
    handlePressIn();
    const { pageX, pageY } = event.nativeEvent;
    menuRef.current.measureInWindow((x, y, width, height) => {
      if (
        pageX >= x &&
        pageX <= x + width &&
        pageY >= y &&
        pageY <= y + height
      ) {
        const option = options[Math.floor((pageX - x) / (width / options.length))];
        handleSelectOption(option);
      }
    });
  };

  const options = [
    {
      label: "Cancel",
      onPress: () => console.log("Calcel selected"),
    },
    {
      label: "Option 1",
      onPress: () => console.log("Option 1 selected"),
    },
    {
      label: "Option 2",
      onPress: () => console.log("Option 2 selected"),
    },
    {
      label: "Option 3",
      onPress: () => console.log("Option 3 selected"),
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Pressione para exibir o menu</Text>
      </TouchableOpacity>
      <View
        style={styles.touchArea}
        onTouchMove={handleMove}
        onTouchEnd={handlePressOut}
        ref={menuRef}
      />
      <ActionMenu visible={menuVisible} options={options} onPress={handleSelectOption} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  actionMenu: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 300,
    left: 20,
    right: 20,
  },
  menuItem: {
    padding: 10,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  touchArea: {
    position: "absolute",
    backgroundColor: "transparent",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

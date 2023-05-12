import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import { View, ButtonPrimary, ButtonEmpyte, TxtButton } from '../../../../components/styles';
import { ThemeContext } from '../../../../components/theme';
import { LocaleContext } from '../../../../components/locale';
import { FirestoreContext } from '../../../../api/firebase';

const Focus = ({ setFocusItens }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const [selectedButtons, setSelectedButtons] = useState({});
  const buttons = [
    { title: 'Programming', selected: false },
    { title: 'Designer', selected: false },
    { title: 'Development', selected: false },
    { title: 'Debugging', selected: false },
  ];

  const handleSelect = (button) => {
    const newSelectedButtons = { ...selectedButtons };
    if (newSelectedButtons[button]) {
      delete newSelectedButtons[button];
    } else {
      newSelectedButtons[button] = true;
    }
    setSelectedButtons(newSelectedButtons);
    const selectedButtonNames = Object.keys(newSelectedButtons);
    setFocusItens(selectedButtonNames);
  };

  const renderItem = ({ item }) => (
    <ButtonEmpyte
      style={[
        styles.button,
        {
          backgroundColor: selectedButtons[item.title] ? theme.secondary : theme.primary,
        },
      ]}
      onPress={() => handleSelect(item.title)}
    >
      <TxtButton>{item.title}</TxtButton>
    </ButtonEmpyte>
  );

  const styles = StyleSheet.create({
    button: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: 150,
      height: 45,
      margin: 10,
      borderRadius: 30,
      backgroundColor: theme.primary,
    },
  });

  return (
    <FlatList
      data={buttons}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      numColumns={2}
    />
  );
};

Focus.propTypes = {
  setFocusItens: PropTypes.func.isRequired,
};

export default Focus;

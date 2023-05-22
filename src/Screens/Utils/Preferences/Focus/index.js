import React, { useContext, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import { View, Input, TextInput, ButtonEmpyte, TxtButton } from '../../../../components/styles';
import { LocaleContext } from '../../../../components/locale';
import { ThemeContext } from '../../../../components/theme';

const Focus = ({ setFocusItens }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const [selectedButtons, setSelectedButtons] = useState({});
  const [otherItens, setOtherItens] = useState({});
  const [other, setOther] = useState(false);
  const buttons = [
    { title: locale.preferences.focus.itens.personal, selected: false },
    { title: locale.preferences.focus.itens.commercial, selected: false },
    { title: locale.preferences.focus.itens.academic, selected: false },
    { title: locale.preferences.focus.itens.other, selected: false },
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

    if (selectedButtonNames.includes("Other")) {
      setOther(true);
    } else {
      setOther(false);
    }
  
  };

  const renderItem = ({ item }) => (
    <ButtonEmpyte
      style={[
        styles.button,
        {
          backgroundColor: theme.primary,
          opacity: selectedButtons[item.title] ? 0.5 : 1,
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
    shadow: {
      shadowColor: "#000000",
      shadowOffset: {width: 0, height: 3},
      shadowOpacity:  0.17,
      shadowRadius: 3.05,
      elevation: 4
    }
  });

  return (
    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
      <FlatList
        data={buttons}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        numColumns={2}
      />
      {other?
        <View style={{flex: 1, width: '75%'}}>
          <Input style={{...styles.shadow, marginTop: -110}}>
            <TextInput 
              placeholder={locale.preferences.focus.other_input.placeholder}
              placeholderTextColor={theme.primary}
              onChangeText={(text) => setOtherItens(text)}
            />
          </Input>
        </View>
    :null}
    </View>
  );
};

Focus.propTypes = {
  setFocusItens: PropTypes.func.isRequired,
};

export default Focus;

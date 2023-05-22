import React, { useContext, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import { View, ButtonEmpyte, TxtButton } from '../../../../components/styles';
import { LocaleContext } from '../../../../components/locale';

const Interests = ({ setInterestsItens }) => {
  const { locale } = useContext(LocaleContext);
  const [selectedButtons, setSelectedButtons] = useState({});
  
  const buttons = [
    { title: locale.preferences.interests.itens.html, color: '#3ABF38', selected: false },
    { title: locale.preferences.interests.itens.ia, color: '#FFBF00', selected: false },
    { title: locale.preferences.interests.itens.graphic_design, color: '#56CCF2', selected: false },
    { title: locale.preferences.interests.itens.musical_production, color: '#F2994A', selected: false },
    { title: locale.preferences.interests.itens.c_sharp, color: '#1400FF', selected: false },
    { title: locale.preferences.interests.itens.r, color: '#BB6BD9', selected: false },
    { title: locale.preferences.interests.itens.web_design, color: '#56CCF2', selected: false },
    { title: locale.preferences.interests.itens.java, color: '#F2994A', selected: false },
    { title: locale.preferences.interests.itens.python, color: '#3ABF38', selected: false },
    { title: locale.preferences.interests.itens.javascript, color: '#1400FF' ,selected: false },
    { title: locale.preferences.interests.itens.ui, color: '#FFBF00', selected: false },
    { title: locale.preferences.interests.itens.ux, color: '#56CCF2', selected: false },
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
    setInterestsItens(selectedButtonNames);
  };

  const renderItem = ({ item }) => (
    <ButtonEmpyte
      style={[
        styles.button,
        {
          backgroundColor: item.color,
          opacity: selectedButtons[item.title] ? 0.5 : 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
        },
      ]}
      onPress={() => handleSelect(item.title)}
    >
      <TxtButton>{item.title}</TxtButton>
    </ButtonEmpyte>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 4,
      borderRadius: 30,
    },
    contentContainer: {  
      paddingHorizontal: 30,
      flexDirection: 'column',
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={buttons}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        numColumns={3}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

Interests.propTypes = {
  setInterestsItens: PropTypes.func.isRequired,
};

export default Interests ;

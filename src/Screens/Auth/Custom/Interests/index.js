import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import { View, ButtonPrimary, ButtonEmpyte, TxtButton } from '../../../../components/styles';
import { ThemeContext } from '../../../../components/theme';
import { LocaleContext } from '../../../../components/locale';
import { FirestoreContext } from '../../../../api/firebase';

const Interests = ({ setInterestsItens }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const [selectedButtons, setSelectedButtons] = useState({});
  
  const buttons = [
    { title: 'HTML', color: '#3ABF38', selected: false },
    { title: 'IA', color: '#FFBF00', selected: false },
    { title: 'Design Grafíco', color: '#56CCF2', selected: false },
    { title: 'Produção Musical', color: '#F2994A', selected: false },
    { title: 'UI', color: '#FFBF00', selected: false },
    { title: 'UX', color: '#3ABF38', selected: false },
    { title: 'Web Design', color: '#56CCF2', selected: false },
    { title: 'Python', color: '#F2994A', selected: false },
    { title: 'Node', color: '#BB6BD9', selected: false },
    { title: 'PHP', color: '#1400FF' ,selected: false },
    { title: 'Java', color: '#3ABF38', selected: false },
    { title: 'C# ', color: '#FFBF00', selected: false },
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

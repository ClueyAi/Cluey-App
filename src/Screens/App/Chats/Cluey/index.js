import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import PropTypes from "prop-types";

import { ThemeContext } from "../../../../components/theme";
import {
  Main,
  View,
  Profile,
  Infor,
  H3,
  ButtonEmpyte,
} from "../../../../components/styles";

const Cluey = ({ item, handlerEditChatName, handlerDeleteChat }) => {
  const { theme } = useContext(ThemeContext);

	const styles = StyleSheet.create({
    cards: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      width: '95%',
      paddingHorizontal: 10,
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 20,
      backgroundColor: theme.background, 
    },
    data: {
      flex: 1,
      flexDirection: 'column',
      alignSelf: 'center',
    },
    actions: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      marginRight: 5,
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
    <Main style={{...styles.shadow, ...styles.cards}}>
      <View style={styles.data}>
        <Profile
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            height: 50,
            paddingLeft: 10,
          }}
        >
          <Ionicons name="chatbubbles-outline" size={28} color={theme.text} />
          <Infor
            style={{
              width: "auto",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: 15,
            }}
          >
            <H3>{item.name}</H3>
          </Infor>
        </Profile>
      </View>
      <View style={styles.actions}>
        {item.id !== "default" ?
          <ButtonEmpyte onPress={() => handlerEditChatName(item.id, 'edited')}>
            <MaterialIcons style={{marginRight: 10}} name="edit" size={24} color={theme.text} />
          </ButtonEmpyte>
        : null}
        {item.id !== "default" ?
          <ButtonEmpyte onPress={() => handlerDeleteChat(item.id)}>
            <MaterialIcons name="delete-outline" size={24} color={theme.text} />
          </ButtonEmpyte>
        : null}
      </View>
    </Main>
  );
};

Cluey.propTypes = {
	item: PropTypes.object.isRequired,
  handlerDeleteChat: PropTypes.func.isRequired,
  handlerEditChatName: PropTypes.func.isRequired,
};

export default Cluey;

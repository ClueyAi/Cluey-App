import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import PropTypes from "prop-types";

import { ThemeContext } from "../../../../../components/theme";
import {
  Main,
  View,
  Profile,
  Infor,
  H4,
  ButtonEmpyte,
  ChatTextInput
} from "../../../../../components/styles";

const Cluey = ({ item, handlerEditChatName, handlerDeleteChat }) => {
  const { theme } = useContext(ThemeContext);
  const [editing, setEditing] = useState(false);
  const [chatName, setChatName] = useState(item.name);

  const chatNameValidation = (text) => {
    setChatName(text);
  };
  const handlerEdit = () => {
    setEditing(!editing);
  };

  const handlerConfirmNameEdit = () => {
    setEditing(!editing);
    if (chatName !== item.name && chatName !== "") {
      handlerEditChatName(item.id, chatName);
    }
    setChatName(item.name);
  };

	const styles = StyleSheet.create({
    cards: {
      flex: 1,
      flexDirection: 'row',
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
    }
  });

  return (
    <Main style={styles.cards}>
      <View style={styles.data}>
        <Profile
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            height: 40,
            paddingLeft: 10,
          }}
        >
          <AntDesign name="bulb1" size={22} color={theme.text} />
          <Infor
            style={{
              width: "auto",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: 15,
            }}
          >
            {editing?
              <ChatTextInput
                placeholder={chatName}
                value={chatName}
                placeholderTextColor={theme.primary}
                selectionColor={theme.primary}
                autoFocus
                onChangeText={chatNameValidation}
                onSubimiyEditing={handlerConfirmNameEdit}
              />  
            :
              <H4>{item.name}</H4>
            }
          </Infor>
        </Profile>
      </View>
        {editing?
        <View style={styles.actions}>
          <ButtonEmpyte onPress={handlerConfirmNameEdit}>
            <MaterialIcons style={{marginRight: 10}} name="check" size={18} color={theme.secondary} />
          </ButtonEmpyte>
        </View>
        :
        <View style={styles.actions}>
          <ButtonEmpyte onPress={handlerEdit}>
            <MaterialIcons style={{marginRight: 10}} name="edit" size={18} color={theme.text} />
          </ButtonEmpyte>
          <ButtonEmpyte onPress={() => handlerDeleteChat(item.id)}>
            <MaterialIcons name="delete-outline" size={18} color={theme.text} />
          </ButtonEmpyte>
        </View>
        }
    </Main>
  );
};

Cluey.propTypes = {
	item: PropTypes.object.isRequired,
  handlerDeleteChat: PropTypes.func.isRequired,
  handlerEditChatName: PropTypes.func.isRequired,
};

export default Cluey;

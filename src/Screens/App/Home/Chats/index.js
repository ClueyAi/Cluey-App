import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import PropTypes from "prop-types";

import { FirestoreContext } from '../../../../api/firebase';
import { LocaleContext } from '../../../../components/locale';
import { ThemeContext, shadow } from '../../../../components/theme';
import { Container, H3, P, ButtonEmpyte } from '../../../../components/styles';

import Cluey from './Cluey';

const Chats = ({navigation}) => {
  const {chats, editChat, deleteChat} = useContext(FirestoreContext);
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);

  const handlerEditChatName = (chatId, newName) => {
    editChat(chatId, newName);
  };

  const handlerDeleteChat = (chatId) => {
    deleteChat(chatId);
  };

  const handlerChat = (item) => {
    navigation.navigate('Chat', {id: item.id});
  };

  const MoreButton = () => {
    return (
      <ButtonEmpyte 
        style={{
          ...shadow,
          width: 100,
          height: 30,
          margin: 10,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
          backgroundColor: theme.primary,
        }} 
        onPress={() => {}}
      >
        <P style={{fontSize: 14, color: theme.text}}>{locale.home.teams.more_button.text}</P>
      </ButtonEmpyte>
    );
  };

  return (
    <Container>
      <H3 style={{paddingTop: 5, paddingBottom: 10}}>{locale.home.chats.title}</H3>
      {chats?
        <FlatList
          data={chats}
          style={{width: '100%', paddingTop: 10, paddingBottom: 30}}
          keyExtractor={(item, index) => index.toString() + chats.length.toString()}
          renderItem={({ item }) => (
            <ButtonEmpyte 
              style={{
                ...shadow,
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                width: '95%',
                paddingHorizontal: 10,
                marginTop: 5,
                marginBottom: 5,
                borderRadius: 30,
                backgroundColor: theme.background
              }} 
              onPress={() => handlerChat(item)}
            >
              <Cluey item={item} handlerDeleteChat={handlerDeleteChat} handlerEditChatName={handlerEditChatName}/>
            </ButtonEmpyte>
          )}
          ListFooterComponent={<MoreButton />}
        />
      :null}
    </Container>
  );
};

Chats.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Chats;
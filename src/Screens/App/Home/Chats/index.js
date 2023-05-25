import React, { useContext } from 'react';
import { FlatList  } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import PropTypes from "prop-types";

import { FirestoreContext } from '../../../../api/firebase';
import { LocaleContext } from '../../../../components/locale';
import { ThemeContext, shadow } from '../../../../components/theme';
import { Container, H3, ButtonEmpyte } from '../../../../components/styles';

import Cluey from './Cluey';
import Suggests from './Suggests';

const Chats = ({navigation}) => {
  const {chats, editChat, deleteChat, createChat, createUserMessage, createAiMessage} = useContext(FirestoreContext);
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);

  const suggestionsData = locale.home.suggestions.itens;

  const suggestions = [
    {id: suggestionsData.s1.id, name: suggestionsData.s1.name, prompt: suggestionsData.s1.prompt},
    {id: suggestionsData.s2.id, name: suggestionsData.s2.name, prompt: suggestionsData.s2.prompt},
    {id: suggestionsData.s3.id, name: suggestionsData.s3.name, prompt: suggestionsData.s3.prompt},
    {id: suggestionsData.s4.id, name: suggestionsData.s4.name, prompt: suggestionsData.s4.prompt},
    {id: suggestionsData.s5.id, name: suggestionsData.s5.name, prompt: suggestionsData.s5.prompt},
  ];

  const handlerEditChatName = async (chatId, newName) => {
    await editChat(chatId, newName);
  };

  const handlerDeleteChat = async (chatId) => {
    await deleteChat(chatId);
  };

  const handlerChat = (item) => {
    navigation.navigate('Chat', {id: item.id});
  };

  const handlerSuggests = async (item) => {
    const textValue = item.prompt;
    if (textValue.text !== "") {
      try {
        let chatId = null;
        await createChat(textValue).then((item) => {
          chatId = item.id;
          navigation.navigate("Chat", {id: item.id});
        });
        await createUserMessage(chatId, textValue);
        createAiMessage(chatId, textValue);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const MoreButton = () => {
    return (<ButtonEmpyte style={{marginBottom: 30}} />);
    /*return (
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
        <P style={{fontSize: 14, color: theme.text}}>{locale.home.more_button.text}</P>
      </ButtonEmpyte>
    );*/
  };

  return (
    <Container>
      <H3 style={{paddingTop: 15, paddingBottom: 10}}>{locale.home.chats.title}</H3>
      <FlatList
      data={chats}
      style={{width: '100%', paddingTop: 10, maxHeight: '40%'}}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ButtonEmpyte 
          style={{
            ...shadow,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            width: '92%',
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
    <AntDesign style={{marginBottom: 40}} name="swap" size={22} color={theme.text} />
    <H3 style={{paddingTop: 5, paddingBottom: 10}}>{locale.home.suggestions.title}</H3>
    <FlatList
      data={suggestions}
      style={{width: '100%', paddingTop: 10}}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ButtonEmpyte 
          style={{
            ...shadow,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            width: '92%',
            paddingHorizontal: 10,
            marginTop: 5,
            marginBottom: 5,
            borderRadius: 30,
            backgroundColor: theme.background
          }} 
          onPress={() => handlerSuggests(item)}
        >
          <Suggests item={item} />
        </ButtonEmpyte>
      )}
      ListFooterComponent={<MoreButton />}
    />
    </Container>
  );
};

Chats.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Chats;
import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { FirestoreContext } from '../../../api/firebase';

import { Container, H2, Divider } from '../../../components/styles';
import Teams from './Teams';
import Cluey from './Cluey';
import New from './Cluey/New';

const Chats = () => {
  const {contacts, allUsers, chats, createChat, editChat, deleteChat} = useContext(FirestoreContext);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handlerEditChatName = (chatId, newName) => {
    editChat(chatId, newName);

  };

  const handlerDeleteChat = (chatId) => {
    deleteChat(chatId);
  };

  useEffect(() => {
    console.log('contacts', contacts);
    const filteredUsers = allUsers.filter(user => {
      try {
        return contacts.some(contact => contact === user.email);
      } catch (error) {
        console.error(error);
      }
    });
    setFilteredUsers(filteredUsers);
  }, [allUsers, contacts]);

  return (
    <Container>
      {chats?
        <FlatList
          data={chats}
          style={{width: '100%', paddingTop: 10, paddingBottom: 30}}
          keyExtractor={(item, index) => index.toString() + chats.length.toString()}
          renderItem={({ item }) => (
            <Cluey item={item} handlerDeleteChat={handlerDeleteChat} handlerEditChatName={handlerEditChatName}/>
          )}
          ListHeaderComponent={<New createChat={createChat}/>}
        />
      :null}
      <Divider style={{width: '80%'}}/>
      <H2 style={{paddingTop: 5, paddingBottom: 10}}>Teams</H2>
      {filteredUsers?
        <FlatList
          data={filteredUsers}
          style={{width: '100%', paddingBottom: 40}}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Teams item={item}/>
          )}
        />
      :null}
    </Container>
  );
};

export default Chats;
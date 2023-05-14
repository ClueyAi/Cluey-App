import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import PropTypes from "prop-types";

import { FirestoreContext } from '../../../api/firebase';
import { ThemeContext, shadow } from '../../../components/theme';
import { Container, ButtonEmpyte } from '../../../components/styles';
import Peoples from './Peoples';
import New from './New';

const Contacts = ({navigation}) => {
  const {user, getContacts, putContact, createFriendChat} = useContext(FirestoreContext);
  const {theme} = useContext(ThemeContext);
  const [contactList, setContactList] = useState([]);

  const contacts = user?.contacts;

  const handlerChat = async (item) => {
    try {
      createFriendChat(item.profile.email)
      await navigation.navigate('Chat', {id: item.profile.email});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribed = getContacts(contacts).then((users) => {
      setContactList(users);
    });

    return () => unsubscribed;
  }, [contacts]);

  return (
    <Container>
      <FlatList
        data={contactList}
        style={{width: '100%', paddingTop: 5, paddingBottom: 40}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ButtonEmpyte 
            style={{
              ...shadow,
              alignSelf: 'center',
              width: '95%',
              marginTop: 5,
              marginBottom: 5,
              borderRadius: 20,
              paddingHorizontal: 10,
              backgroundColor: theme.background
            }} 
            onPress={() => handlerChat(item)}
          >
            <Peoples item={item}/>
          </ButtonEmpyte>
        )}
        ListHeaderComponent={<New putContact={putContact}/>}
      />
    </Container>
  );
};

Contacts.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Contacts;
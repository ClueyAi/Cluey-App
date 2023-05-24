import React, { useContext, useEffect } from 'react';
import { FlatList } from 'react-native';
import PropTypes from "prop-types";

import { FirestoreContext } from '../../../api/firebase';
import { ThemeContext, shadow } from '../../../components/theme';
import { Container, ButtonEmpyte } from '../../../components/styles';

import Peoples from './Peoples';
import Talks from './Talks';
import New from './New';

const Contacts = ({navigation}) => {
  const {user, getContacts, contacts, putContact, getTalks, talks, createTalk} = useContext(FirestoreContext);
  const {theme} = useContext(ThemeContext);

  const handlerChat = async (item) => {
    try {
      createTalk(item?.profile.email).then((talk) => {
        if (talk != null) {
          navigation.navigate('Talk', {id: talk});
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        getContacts();
        getTalks();
      } catch (error) {
        console.error(error);
      }
    });

    return unsubscribe;
  }, [navigation], user, contacts, talks);

  return (
    <Container>
      <FlatList
        data={talks}
        style={{width: '100%', paddingTop: 5, paddingBottom: 40}}
        keyExtractor={(item, index) => index.toString() + talks.length.toString()}
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
            onPress={() => handlerChat(item.userData)}
          >
            <Talks item={item} />
          </ButtonEmpyte>
        )}
      />
      <FlatList
        data={contacts}
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
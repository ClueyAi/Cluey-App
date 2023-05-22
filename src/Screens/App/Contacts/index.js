import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import PropTypes from "prop-types";

import { FirestoreContext } from '../../../api/firebase';
import { ThemeContext, shadow } from '../../../components/theme';
import { Container, ButtonEmpyte } from '../../../components/styles';

import Peoples from './Peoples';
import Talks from './Talks';
import New from './New';

const Contacts = ({navigation}) => {
  const {contacts, putContact, talks, createTalk} = useContext(FirestoreContext);
  const {theme} = useContext(ThemeContext);

  const handlerChat = async (item) => {
    try {
      createTalk(item.profile.email).then((talk) => {
        console.log(talk);
        if (talk != null) {
          navigation.navigate('Chat', {id: talk});
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <FlatList
        data={talks}
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
import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { FirestoreContext } from '../../../api/firebase';

import { Container } from '../../../components/styles';
import Peoples from './Peoples';
import New from './Peoples/New';

const Contacts = () => {
  const {contacts, allUsers, putContact} = useContext(FirestoreContext);
  const [filteredUsers, setFilteredUsers] = useState(null);

  useEffect(() => {
    const filteredUsers = allUsers.filter(user => {
      try {
        return contacts.some(contact => contact === user.email);
      } catch (error) {
        console.error(error);
      }
    });
    setFilteredUsers(filteredUsers);
  }, [allUsers, contacts]);

  console.log('filteredUsers', filteredUsers);

  return (
    <Container>
      {filteredUsers?
        <FlatList
          data={filteredUsers}
          style={{width: '100%', paddingTop: 5, paddingBottom: 40}}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Peoples item={item}/>
          )}
          ListHeaderComponent={<New putContact={putContact}/>}
        />
      :null}
    </Container>
  );
};

export default Contacts;
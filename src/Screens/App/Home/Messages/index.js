import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { FirestoreContext } from '../../../../api/firebase';
import { Main } from '../../../../components/styles';
import Mark from '../../../../components/mark';

import Message from './Message';

const Messages = () => {
  const {messages} = useContext(FirestoreContext);

  return (
    <Main>
      <Mark/>
      {messages?
        <FlatList
          inverted
          style={{scaleY: -1}}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Message data={item}/>
          )}
        />
      :null}
    </Main>
  );
};

export default Messages;
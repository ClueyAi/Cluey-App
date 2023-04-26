import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
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
          <MenuProvider>
            <FlatList
              inverted
              style={{scaleY: -1}}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Message data={item}/>
              )}
            />
          </MenuProvider>
        :null}
      </Main>
  );
};

export default Messages;
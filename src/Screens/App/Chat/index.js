import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import { FirestoreContext } from '../../../api/firebase';
import { Container } from '../../../components/styles';

import Messages from './Messages';
import New from './New';

const Chat = ({navigation, route}) => {
  const {app, chats} = useContext(FirestoreContext);

  const {id} = route.params;
  const chat = chats?.find(chat => chat.id === id);
  const status = app?.status;
  
  if (!status) {
    return (
      <Container>
        <Messages chat={chat} navigation={navigation} />
      </Container>
    );
  }

  return (
    <Container>
      <Messages chat={chat} navigation={navigation} />
      <New chatId={id} />
    </Container>
  );
};

Chat.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

export default Chat;
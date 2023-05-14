import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import { FirestoreContext } from '../../../api/firebase';
import { Container } from '../../../components/styles';

import Messages from './Messages';
import New from './New';
import Friend from './Friend';

const Chat = ({navigation, route}) => {
  const {app, chats, friendChats, user} = useContext(FirestoreContext);

  const {id} = route.params;
  const chat = chats?.find(chat => chat.id === id);
  const isFriend = user.contacts?.find(chat => chat === id);
  const chatFriend = friendChats?.find(chat => chat.id === id);
  const status = app?.status;

  if (isFriend) {
    return (
      <Container>
        <Messages chat={chatFriend} navigation={navigation} />
        <Friend chatId={id} />
      </Container>
    );
  }
  
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
import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from "prop-types";

import { Main } from '../../../../components/styles';
import Mark from '../../../../components/mark';

import Message from './Message';

const Messages = ({chat}) => {
  const messages = chat?.messages;

  return (
    <Main>
      <Mark/>
      {messages?
        <FlatList
          data={messages.reverse()}
          inverted
          style={{scaleY: -1}}
          keyExtractor={(item, index) => index.toString() + messages.length.toString()}
          renderItem={({ item }) => (
            <Message data={item}/>
          )}
        />
      :null}
    </Main>
  );
};

Messages.propTypes = {
  chat: PropTypes.object,
};

export default Messages;
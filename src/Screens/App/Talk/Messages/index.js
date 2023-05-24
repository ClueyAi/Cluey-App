import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from "prop-types";

import { Main } from '../../../../components/styles';
import Mark from '../../../../components/mark';

import Message from './Message';

const Messages = ({whisps}) => {
const message = whisps?.messages;

  return (
    <Main>
      <Mark/>
      {message?
        <FlatList
          data={message.reverse()}
          inverted
          style={{scaleY: -1}}
          keyExtractor={(item, index) => index.toString() + message.length.toString()}
          renderItem={({ item }) => (
            <Message data={item}/>
          )}
        />
      :null}
    </Main>
  );
};

Messages.propTypes = {
  whisps: PropTypes.object,
};

export default Messages;
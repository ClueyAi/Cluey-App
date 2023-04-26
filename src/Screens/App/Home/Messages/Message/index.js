import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { UserContext } from '../../../../../api/firebase';

import { 
  ChatMessages,
  ResponseMessages,
  RequestMessages
} from '../../../../../components/styles';

import Send from './Send';
import Receive from './Receive';

const Message = ({ data }) => {
  const {user} = useContext(UserContext);

  if (!data ) {
    return null;
  };

  return (
    <ChatMessages>
      <ResponseMessages>
        {data?.userId !== user?.uid ? (
          <Send style={styles.shadow} data={data}/>
        ) : null}
      </ResponseMessages>
      <RequestMessages>
        {data?.userId === user?.uid ? (
          <Receive style={styles.shadow} data={data}/>
        ) : null}
      </RequestMessages>
    </ChatMessages>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 4
  }
});

export default Message;
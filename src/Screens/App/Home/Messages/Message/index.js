import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { UserContext } from '../../../../../api/firebase';

import { 
  ChatMessages,
  ResponseMessages,
  RequestMessages
} from '../../../../../components/styles';

import Response from './Response';
import Request from './Request';

const Message = ({ data }) => {
  const {user} = useContext(UserContext);

  if (!data ) {
    return null;
  };

  return (
    <ChatMessages styles={styles.shadow}>
      <ResponseMessages>
        {data?.userId !== user?.uid ? (
          <Response data={data}/>
        ) : null}
      </ResponseMessages>
      <RequestMessages>
        {data?.userId === user?.uid ? (
          <Request data={data}/>
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
    elevation: 6
  }
});

export default Message;
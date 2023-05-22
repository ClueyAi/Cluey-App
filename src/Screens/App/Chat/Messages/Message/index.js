import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FirestoreContext } from '../../../../../api/firebase';

import { 
  ChatMessages,
  ResponseMessages,
  RequestMessages
} from '../../../../../components/styles';

import Request from './Request';
import Response from './Response';

const Message = ({ data }) => {
  const {user} = useContext(FirestoreContext);

  if (!data ) {
    return null;
  }

  return (
    <ChatMessages>
      <RequestMessages>
        {data?.idUser === user?.uid ? (
          <Request data={data}/>
        ) : null}
      </RequestMessages>
      <ResponseMessages>
        {data?.idUser !== user?.uid ? (
          <Response data={data}/>
        ) : null}
      </ResponseMessages>
    </ChatMessages>
  );
};

Message.propTypes = {
  data: PropTypes.object.isRequired
};

export default Message;
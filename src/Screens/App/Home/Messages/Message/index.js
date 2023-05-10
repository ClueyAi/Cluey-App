import React, { useContext } from 'react';
import PropTypes from 'prop-types';

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
  }

  return (
    <ChatMessages>
      <ResponseMessages>
        {data?.idUser !== user?.uid ? (
          <Response data={data}/>
        ) : null}
      </ResponseMessages>
      <RequestMessages>
        {data?.idUser === user?.uid ? (
          <Request data={data}/>
        ) : null}
      </RequestMessages>
    </ChatMessages>
  );
};

Message.propTypes = {
  data: PropTypes.object.isRequired
};

export default Message;
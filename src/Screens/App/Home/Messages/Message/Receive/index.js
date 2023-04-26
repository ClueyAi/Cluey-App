import React from 'react';

import { 
  Request,
  MessageText,
  DateText
} from '../../../../../../components/styles';
import Options from '../Options';

const Receive = ({ data }) => {
  const time = data?.createdAt.substring(11, 16);

  return (
    <Options data={data}>
      <Request>
        <MessageText>{data?.text}</MessageText>
        <DateText>{time}</DateText>
      </Request>
    </Options>
  );
};

export default Receive;
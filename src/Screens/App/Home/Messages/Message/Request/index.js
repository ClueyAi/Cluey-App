import React from 'react';

import { 
  MessageRight,
  MessageText,
  DateText
} from '../../../../../../components/styles';
import Options from '../Options';

const Request = ({ data }) => {
  const time = data?.createdAt.substring(11, 16);

  return (
    <Options data={data}>
      <MessageRight>
        <MessageText>{data?.text}</MessageText>
        <DateText>{time}</DateText>
      </MessageRight>
    </Options>
  );
};

export default Request;
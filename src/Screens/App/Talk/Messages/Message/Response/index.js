import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { 
  MessageLeft,
  NameText,
  MessageText,
  DateText,
} from '../../../../../../components/styles';
import Menu from './Menu';

const Response = ({ data }) => {
  const time = data?.createdAt.substring(11, 16);

  return (
    <Menu data={data}>
      <MessageLeft style={styles.shadow}>
        <NameText>{data?.name}</NameText>
        <MessageText>{data?.text}</MessageText>
        <DateText>{time}</DateText>
      </MessageLeft>
    </Menu>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {width: 1, height: 2},
    shadowOpacity:  0.17,
    shadowRadius: 2.05,
    elevation: 4
  }
});

Response.propTypes = {
  data: PropTypes.object.isRequired
};

export default Response;
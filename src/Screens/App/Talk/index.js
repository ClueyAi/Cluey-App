import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FirestoreContext } from '../../../api/firebase';
import { Container } from '../../../components/styles';

import Messages from './Messages';
import New from './New';

const Talk = ({ navigation, route }) => {
  const { whisps, getWhisps } = useContext(FirestoreContext);
  const { id } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getWhisps(id);
    });
  
    return unsubscribe;
  }, [navigation, id]);

  return (
    <Container>
      <Messages whisps={whisps} navigation={navigation} />
      <New talkId={id} />
    </Container>
  );
};

Talk.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Talk;

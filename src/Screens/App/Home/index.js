import React from 'react';

import { Container } from '../../../components/styles';
import Messages from './Messages';
import Chat from './Chat';

const Home = () => {
  return (
    <Container>
      <Messages/>
      <Chat/>
    </Container>
  );
};

export default Home;
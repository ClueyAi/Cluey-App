import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from "prop-types";

import { AuthContext } from '../../../api/firebase'
import { LocaleContext } from '../../../components/locale'
import { 
  Container,
  Heading,
  View,
  H1, H3, P, PMini,
  TxtButton,
  LogoutButton,
  ButtonPrimary,
  ButtonSecondary,
  ButtonEmpyte,
  ActivityIndicator
} from '../../../components/styles';

import Focus from './Focus'
import Interests from './Interests'

const Custom = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const [focusItens, setFocusItens] = useState([]);
  const [interestsItens, setInterestsItens] = useState([]);
  const [focusDone, setFocusDone] = useState(false);

  const handleConfirFocus = () => {
    console.log(focusItens);
    setFocusDone(true);
  };
  const handleConfirmInterests = () => {
    console.log(interestsItens);
    setFocusDone(false);
  };
  
  if(focusDone){
    return(
      <Container>
        <Heading style={{marginTop: '10%', marginBottom: 15}}>
          <H1 style={{marginBottom: 50, fontSize: 25}}>Interests</H1>
          <P style={{marginBottom: 20}}>{locale.custom.description}</P>
        </Heading>
        <Interests setInterestsItens={setInterestsItens} />
        <ButtonPrimary style={{bottom: '10%'}} onPress={handleConfirmInterests}>
          <TxtButton>Confirm</TxtButton>
        </ButtonPrimary>
      </Container>
    );
  }
  else{
    return(
      <Container>
        <Heading style={{marginTop: '10%', marginBottom: 15}}>
          <H1 style={{marginBottom: 50, fontSize: 25}}>Focus</H1>
          <P style={{marginBottom: 20}}>{locale.custom.description}</P>
        </Heading>
        <Focus setFocusItens={setFocusItens} />
        <ButtonPrimary style={{bottom: '10%'}} onPress={handleConfirFocus}>
          <TxtButton>Confirm</TxtButton>
        </ButtonPrimary>
      </Container>
    );
  }
};

Custom.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Custom;
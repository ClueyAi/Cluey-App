import React, { useState, useContext } from 'react'
import PropTypes from "prop-types";

import { LocaleContext } from '../../../components/locale'
import { FirestoreContext } from '../../../api/firebase/firestore';
import { 
  Container,
  Heading,
  View,
  H1, P,
  TxtButton,
  ButtonPrimary,
  ButtonEmpyte,
  TxtLink,
  FooterSmall
} from '../../../components/styles';

import Focus from './Focus'
import Interests from './Interests'

const Custom = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {putPreferences, test} = useContext(FirestoreContext);
  const [focusItens, setFocusItens] = useState(null);
  const [interestsItens, setInterestsItens] = useState(null);
  const [focusDone, setFocusDone] = useState(false);

  const handleContinueFocus = () => {
    setFocusDone(true);
  };
  const handleSkipFocus = () => {
    setFocusDone(true);
  };

  const handleContinueInterests = async () => {
    //await putPreferences(preferences);
    test(focusItens, interestsItens);
    navigation.navigate('Loading')
  };
  const handleSkipInterests = async () => {
    await putPreferences([]);
    navigation.navigate('Loading')
  };
  
  if(focusDone){
    return(
      <Container>
        <Heading style={{marginTop: '10%', marginBottom: 15}}>
          <H1 style={{marginBottom: 50, fontSize: 25}}>{locale.custom.interests.title}</H1>
          <P style={{marginBottom: 20}}>{locale.custom.interests.description}</P>
        </Heading>
        <Interests setInterestsItens={setInterestsItens} />
        <ButtonPrimary style={{bottom: '5%'}} onPress={handleContinueInterests}>
          <TxtButton>{locale.custom.continue_button.text}</TxtButton>
        </ButtonPrimary>
        <ButtonEmpyte onPress={handleSkipInterests}>
          <TxtLink>{locale.custom.skip_button.text}</TxtLink>
        </ButtonEmpyte>
        <FooterSmall>
          <View style={{marginTop: 10}}>
            <H1>{locale.global.app.name}</H1>
          </View>
        </FooterSmall>
      </Container>
    );
  }
  else{
    return(
      <Container>
        <Heading style={{marginTop: '10%', marginBottom: 15}}>
          <H1 style={{marginBottom: 50, fontSize: 25}}>{locale.custom.focus.title}</H1>
          <P style={{marginBottom: 20}}>{locale.custom.focus.description}</P>
        </Heading>
        <Focus setFocusItens={setFocusItens} />
        <ButtonPrimary style={{bottom: '5%'}} onPress={handleContinueFocus}>
          <TxtButton>{locale.custom.continue_button.text}</TxtButton>
        </ButtonPrimary>
        <ButtonEmpyte onPress={handleSkipFocus}>
          <TxtLink>{locale.custom.skip_button.text}</TxtLink>
        </ButtonEmpyte>
        <FooterSmall>
          <View style={{marginTop: 10}}>
            <H1>{locale.global.app.name}</H1>
          </View>
        </FooterSmall>
      </Container>
    );
  }
};

Custom.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Custom;
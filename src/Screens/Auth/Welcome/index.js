import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'; 

import locale from '../../../components/locale'
import { 
  Container,
  Heading,
  View,
  Image,
  H1, P, PMini,
  TxtButton,
  ButtonEmpyte,
  ButtonMulti
} from '../../../components/styles';

export default function Welcome({ navigation }) {
  const handleStart = () => {navigation.navigate("SignIn")}
  const handlePolicy = async () => {navigation.navigate("PolicyTerms")}
  
  return (
    <Container>
      <Heading style={{marginTop: "5%"}}>
        <H1 style={{marginBottom: 10}}>{locale.welcome.title}</H1>
        <P>{locale.welcome.description}</P>
      </Heading>
      <Image
        style={{marginTop: 40, marginBottom: 85}}
        source={require('../../../../assets/images/tour.png')}
      />
      <ButtonMulti onPress={handleStart} accessibilityLabel={locale.welcome.button.msg}>
        <Ionicons name="arrow-forward-outline" size={22} color="#FFFFFF00" />
        <TxtButton>{locale.welcome.button.text}</TxtButton>
        <Ionicons name="arrow-forward-outline" size={22} color="#FFFFFF" />
      </ButtonMulti>
      <View style={{marginTop: 10}}>
        <PMini>{locale.welcome.footer}</PMini>
        <ButtonEmpyte style={{color: '#fff'}} onPress={handlePolicy}>
          <PMini>{locale.global.app.policy_terms.title}</PMini>
        </ButtonEmpyte>
      </View>
    </Container>
  );
}
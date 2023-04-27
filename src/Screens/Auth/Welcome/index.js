import React, { useContext} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'; 

import { LocaleContext } from '../../../components/locale'
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
  const {locale} = useContext(LocaleContext);
  const handleStart = () => {navigation.navigate("SignIn")}
  const handlePolicy = () => {navigation.navigate("UltilsStackNavigator", {screen: "Rules"})}
  
  return (
    <Container>
      <Heading style={{marginTop: "8%"}}>
        <H1 style={{marginBottom: 10}}>{locale.welcome.title}</H1>
        <P>{locale.welcome.description}</P>
      </Heading>
      <Image
        style={{marginTop: 40, marginBottom: 65}}
        source={require('../../../../assets/images/tour.png')}
      />
      <ButtonMulti onPress={handleStart} accessibilityLabel={locale.welcome.button.msg}>
        <Ionicons name="arrow-forward-outline" size={22} color="#FFFFFF00" />
        <TxtButton>{locale.welcome.button.text}</TxtButton>
        <Ionicons name="arrow-forward-outline" size={22} color="#FFFFFF" />
      </ButtonMulti>
      <View style={{marginTop: 15}}>
        <PMini>{locale.welcome.footer}</PMini>
        <ButtonEmpyte style={{color: '#fff'}} onPress={handlePolicy}>
          <PMini>{locale.global.app.policy_terms.title}</PMini>
        </ButtonEmpyte>
      </View>
    </Container>
  );
}
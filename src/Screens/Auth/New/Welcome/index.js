import React, { useContext} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Lottie from "lottie-react-native";
import PropTypes from "prop-types";

import { LocaleContext } from '../../../../components/locale'
import { ThemeContext } from '../../../../components/theme'
import { 
  Container,
  Heading,
  View,
  H1, P, PMini, Link,
  TxtButton,
  ButtonEmpyte,
  ButtonMulti
} from '../../../../components/styles';

const Welcome = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  const handleStart = () => {navigation.navigate('New')}
  const handlePolicy = () => {navigation.navigate('Rules')}
  
  return (
    <Container>
      <Heading style={{marginTop: "8%"}}>
        <H1 style={{marginBottom: 10}}>{locale.welcome.title}</H1>
        <P>{locale.welcome.description}</P>
      </Heading>
      <View style={{flex: 1, width: '85%'}}>
        <Lottie source={require('../../../../../assets/lotties/ai.json')} autoPlay loop/>
      </View>
      {/*
      <Image
        style={{marginTop: 40, marginBottom: 65}}
        source={require('../../../../assets/images/tour.png')}
      />
      */}
      <View style={{marginBottom: "10%"}}>
        <ButtonMulti onPress={handleStart} accessibilityLabel={locale.welcome.button.accessibility}>
          <Ionicons name="arrow-forward-outline" size={22} color={theme.transparent} />
          <TxtButton>{locale.welcome.button.text}</TxtButton>
          <Ionicons name="arrow-forward-outline" size={22} color={theme.background} />
        </ButtonMulti>
        <View style={{marginTop: 50, alignItems: 'center'}}>
          <PMini>{locale.welcome.footer}</PMini>
          <ButtonEmpyte style={{color: theme.background}} onPress={handlePolicy} ccessibilityLabel={locale.global.app.policy_terms.accessibility}>
            <Link>{locale.global.app.policy_terms.title}</Link>
          </ButtonEmpyte>
        </View>
      </View>
    </Container>
  );
};

Welcome.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Welcome;
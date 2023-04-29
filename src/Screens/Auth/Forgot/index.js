import React, { useState, useContext } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from "prop-types";

import { AuthContext } from '../../../api/firebase'

import { LocaleContext } from '../../../components/locale'
import { 
  BgMark,
  LogoBg,
  LogoName,
  Container,
  Heading,
  Form,
  Input,
  TextInput,
  H1, H3, P, PMini,
  ButtonPrimary,
  TxtButton,
  TextError,
} from '../../../components/styles';

const Forgot = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {forgot} = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(null);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const [sendRecovery, setSendRecovery] = useState(false);

  const errorColor = "#FFAAAA50"


  const emailValidate = (text) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmailValid(reg.test(text));
    setEmail(text)
  };

  const handleForgot = async () => {
    try {
      await forgot(email)
      setSendRecovery(true)
    } catch (error) {
      setError(error.code)
       if (error.code === "auth/user-not-found") {
        setErrorEmail(error.code)
        setErrorMsg(locale.error.auth_user_not_found)
        setEmailValid(false)
      } if (error.code === "auth/invalid-email") {
        setErrorEmail(error.code)
        setErrorMsg(locale.error.auth_invalid_email)
        setEmailValid(false)
      }
    }
  }

  const handleContinue = () => {navigation.navigate('Loading')}

  if (sendRecovery == false) { 
    return (
      <Container>
        <BgMark>
          <LogoBg source={require('../../../../assets/images/cluey-happy.png')} />
          <LogoName>{locale.global.app.name}</LogoName>
        </BgMark>

        <Heading style={{marginTop: '65%', marginBottom: 15}}>
          <H1 style={{marginBottom: 10}}>{locale.forgot.title}</H1>
          <P>{locale.forgot.description}</P>
        </Heading>
        <Form>
          <Input backgroundColor={error === errorEmail ? errorColor : "#E0E0E0"}>
            <TextInput
              placeholder={locale.forgot.text_input.email}
              placeholderTextColor="#A4A4A4"
              selectionColor="#FFBF00"
              autoCapitalize="none"
              autoComplete="email"
              returnKeyType="next"
              onChangeText={emailValidate}
              onSubmitEditing={handleForgot}
            /> 
            {emailValid == false ?
              <Ionicons 
                style={{padding: 10, marginRight: 10}}
                name="alert-circle-outline" 
                size={20} 
                color="#FF0000" 
              />
            : 
            <Ionicons 
                style={{padding: 10, marginRight: 10}}
                name="alert-circle-outline" 
                size={20} 
                color="#00000000" 
              />
            }
            {emailValid == true ?
              <Ionicons 
                style={{padding: 10, marginRight: 10}}
                name="checkmark-circle-outline" 
                size={20} 
                color="#00FF00" 
              />
            : null }
          </Input>
          {error ? <TextError>{erroraccessibility}</TextError> : <TextError></TextError> }
          <ButtonPrimary onPress={handleForgot} accessibilityLabel={locale.forgot.button.accessibility}>
            <TxtButton >{locale.forgot.button.text}</TxtButton> 
          </ButtonPrimary>
        </Form>
      </Container>
    );
  } else {
    return (
      <Container>
        <Heading style={{marginTop: '50%', marginBottom: 15}}>
          <H1 style={{marginBottom: 10, fontSize: 25}}>{locale.forgot.success.title}</H1>
          <P>{locale.forgot.success.description}</P>
          <H3 style={{marginTop: 30 ,marginBottom: 5}}>{locale.forgot.success.alert_tittle}</H3>
          <PMini>{locale.forgot.success.alert_accessibility}</PMini>
        </Heading>
        <ButtonPrimary style={{marginTop: 10}} onPress={handleContinue} accessibilityLabel={locale.forgot.success.Button.accessibility}>
          <TxtButton>{locale.forgot.success.Button.text}</TxtButton> 
        </ButtonPrimary>
      </Container>
    )
  }
};

Forgot.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Forgot;
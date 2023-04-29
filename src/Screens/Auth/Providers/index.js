import React, { useState, useContext, useRef, useEffect } from 'react'
import { BackHandler, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
  View,
  Form,
  Input,
  TextInput,
  H1, P, PMini,
  TxtLink,
  ButtonPrimary,
  ButtonSecondary,
  ButtonEmpyte,
  TxtButton,
  TextError,
} from '../../../components/styles';


const Providers = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {signIn} = useContext(AuthContext)
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [errorPassword, setErrorPassword] = useState('');

  const errorColor = "#FFAAAA50"


  const emailValidate = (text) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmailValid(reg.test(text));
    setEmail(text)
  };

  const passwordValidate = (text) => {
    if (emailValid == true) {
      setPasswordValid(true)
      setPassword(text)
    } else {
      setPasswordValid(false)
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password)
      navigation.navigate("Loading")
    } catch (error) {
      setError(error.code)
      if (error.code === "auth/missing-password") {
        setErrorPassword(error.code)
        setErrorMsg(locale.error.auth_missing_password)
        setPasswordValid(false)
      } else if (error.code === "auth/wrong-password") {
        setErrorPassword(error.code)
        setErrorMsg(locale.error.auth_wrong_password)
        setPasswordValid(false)
      } else if (error.code === "auth/user-not-found") {
        setErrorEmail(error.code)
        setErrorMsg(locale.error.auth_user_not_found)
        setEmailValid(false)
      } else if (error.code === "auth/invalid-email") {
        setErrorEmail(error.code)
        setErrorMsg(locale.error.auth_invalid_email)
        setEmailValid(false)
      } else {
        setErrorPassword(error.code)
        setErrorEmail(error.code)
        setErrorMsg(locale.error.auth_connect_user)
        setEmailValid(emailValid == true? true: false)
        setPasswordValid(passwordValid == true? true: false)
      }
    }
  }

  const handleToSignUp = () => {
    navigation.navigate("SignUp")
  }

  const handlePolicy = () => {navigation.navigate('Rules')} 

  const navigatorRef = useRef();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigatorRef.current && navigatorRef.current.getCurrentRoute().name === 'SignIn') {
          return true;
        }
        return true;
      }
    );
    return () => {
      backHandler.remove();
    };
  }, []);
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <BgMark>
          <LogoBg source={require('../../../../assets/images/cluey-happy.png')}/>
          <LogoName>{locale.global.app.name}</LogoName>
        </BgMark>
        <Heading style={{marginTop: '45%', marginBottom: 15}}>
          <H1 style={{marginBottom: 10}}>{locale.signin.title}</H1>
          <P>{locale.signin.description}</P>
        </Heading>
        <Form>
          <Input style={{marginBottom: 10, backgroundColor: `${error === errorEmail && emailValid == false ? errorColor : '#E0E0E0'}`}}>
            <TextInput
              ref={emailRef}
              value={email}
              placeholder={locale.signin.text_input.email}
              placeholderTextColor="#A4A4A4"
              selectionColor="#FFBF00"
              autoCapitalize="none"
              autoComplete="email"
              returnKeyType="next"
              onChangeText={emailValidate}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            {emailValid == false && email !== '' ?
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
            {emailValid == true && email !== '' ?
              <Ionicons 
                style={{padding: 10, marginRight: 10}}
                name="checkmark-circle-outline" 
                size={20} 
                color="#00DF00" 
              />
            : null }
          </Input> 
          <Input style={{marginBottom: 10, backgroundColor: `${passwordValid == false ? errorColor : '#E0E0E0'}`}}>
            <TextInput
              ref={passwordRef}
              placeholder={locale.signin.text_input.password}
              placeholderTextColor="#A4A4A4"
              selectionColor="#FFBF00"
              autoCapitalize="none"
              autoComplete="current-password"
              secureTextEntry={true}
              returnKeyType="next"
              onChangeText={passwordValidate}
              onSubmitEditing={handleSignIn}
            />
          </Input>
          <ButtonEmpyte onPress={() => navigation.navigate("Forgot")}>
            <TxtLink>{locale.forgot.title}</TxtLink>
          </ButtonEmpyte>
          {error ? <TextError>{errorMsg}</TextError> : <TextError> </TextError> }
          <ButtonPrimary onPress={handleSignIn} accessibilityLabel={locale.signin.button.msg}>
            <TxtButton>{locale.signin.button.text}</TxtButton> 
          </ButtonPrimary>
        </Form>
        <ButtonSecondary style={{marginTop: "60%"}} onPress={handleToSignUp} accessibilityLabel={locale.signin.button.signup}>
          <TxtButton>{locale.signup.title}</TxtButton>
        </ButtonSecondary>
        <View style={{marginTop: 15}}>
          <PMini>{locale.welcome.footer}</PMini>
          <ButtonEmpyte style={{color: '#fff'}} onPress={handlePolicy}>
            <PMini>{locale.global.app.policy_terms.title}</PMini>
          </ButtonEmpyte>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
};

Providers.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Providers;
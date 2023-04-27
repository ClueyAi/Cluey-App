import React, { useState, useContext, useRef, useEffect } from 'react'
import { BackHandler, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

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
  H1, P,
  TxtLink,
  ButtonPrimary,
  ButtonSecondary,
  ButtonEmpyte,
  TxtButton,
  TextError,
} from '../../../components/styles';


export default function SignIn({ navigation }) {
  const {locale} = useContext(LocaleContext);
  const {signIn} = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const errorColor = "#FFAAAA50"


  const emailValidate = (text) => {
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
              placeholder={locale.signin.text_input.email}
              placeholderTextColor="#A4A4A4"
              selectionColor="#FFBF00"
              autoCapitalize="none"
              textContentType="emailAddress"
              returnKeyType="next"
              h
              onChangeText={emailValidate}
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
              placeholder={locale.signin.text_input.password}
              placeholderTextColor="#A4A4A4"
              selectionColor="#FFBF00"
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry={true}
              returnKeyType="next"
              onChangeText={passwordValidate}
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
      </Container>
    </TouchableWithoutFeedback>
  );
}
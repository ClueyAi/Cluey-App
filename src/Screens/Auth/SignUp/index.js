import React, {useState, useContext, useEffect} from 'react'
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
  ButtonPrimary,
  TxtButton,
  TextError,
  TextValid,
  TextAlert
} from '../../../components/styles';

export default function SignUp({ navigation }) {
  const {locale} = useContext(LocaleContext);
  const {signUp} = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordStrong, setPasswordStrong] = useState(null);
  const [rePasswordValid, setRePasswordValid] = useState(null);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorEmail, setErrorEmail] = useState('errorEmail');
  const [errorPassword, setErrorPassword] = useState('errorPassword');
  const [errorRePassword, setErrorRePassword] = useState('errorRePassword');

  const errorColor = "#FFAAAA50"


  const emailValidate = (text) => {
    if (text !== '') {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      setEmailValid(reg.test(text));
      setEmail(text ? text : '');
    }
  };

  const passwordValidate = (text) => {
    if (text !== '') {
      const regV = /^(?=.*[a-z])(?=.*[0-9]).{6,22}$/;
      setPasswordValid(regV.test(text))
      const regS = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&]).{6,22}$/;
      setPasswordStrong(regS.test(text))
      setPassword(text ? text : '')
    }
  };
  const rePasswordValidate = (text) => {
    if (passwordValid == true && text !== '') {
      const reg = text === password ? text : rePassword
      setRePasswordValid(text === password ? true : false)
      setRePassword(reg)
    }
  };

  const loadData = () => {
    emailValidate()
    passwordValidate()
    rePasswordValidate()
  }
  
  const handleSignUp = async () => {
    try {
      await signUp(email, rePassword)
      navigation.navigate("Loading")
    } catch (error) {
      setError(error.code)
      if (error.code === "auth/missing-password") {
        setErrorPassword(error.code)
        setErrorMsg(locale.error.auth_missing_password)
        setEmailValid(true)
        setPasswordValid(false)
      } else if (error.code === "auth/wrong-password") {
        setErrorPassword(error.code)
        setErrorMsg(locale.error.auth_wrong_password)
        setEmailValid(true)
        setPasswordValid(false)
      } else if (error.code === "auth/user-not-found") {
        setErrorEmail(error.code)
        setErrorMsg(locale.error.auth_user_not_found)
        setEmailValid(false)
        setPasswordValid(true)
      } else if (error.code === "auth/invalid-email") {
        setErrorEmail(error.code)
        setErrorMsg(locale.error.auth_invalid_email)
        setEmailValid(false)
      } else if (error.code === "auth/missing-email") {
        setErrorEmail(error.code)
        setErrorMsg(locale.error.auth_missing_email)
        setEmailValid(false)
      } else if (error.code === "auth/email-already-in-use") {
        setErrorEmail(error.code)
        setErrorMsg(locale.error.auth_email_already_in_use)
        setEmailValid(false)
        setPasswordValid(true)
      } else {
        setErrorPassword(error.code)
        setErrorEmail(error.code)
        setErrorMsg(locale.error.auth_create_user)
        setEmailValid(emailValid == true? true: false)
        setPasswordValid(passwordValid == true? true: false)
        setPasswordStrong(passwordStrong == true? true: false)
      }
    }
  }

  useEffect(() => {
    loadData()
  }, [])
  
  return (
    <Container>
      <BgMark >
        <LogoBg source={require('../../../../assets/images/cluey-happy.png')}/>
        <LogoName>{locale.global.app.name}</LogoName>
      </BgMark>
      <Heading style={{marginTop: "30%", marginBottom: 15}}>
        <H1 style={{marginBottom: 10}}>{locale.signup.title}</H1>
        <P>{locale.signup.description}</P>
      </Heading>
      <Form>
        <Input style={{marginBottom: 10, backgroundColor: `${error === errorEmail && emailValid == false ? errorColor : '#E0E0E0'}`}}>
          <TextInput
            placeholder={locale.signup.text_input.email}
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
          : emailValid == null && email !== ''?
            <Ionicons 
              style={{padding: 10, marginRight: 10}}
              name="alert-circle-outline" 
              size={20} 
              color="#00000000" 
            /> 
          : emailValid == true && email !== '' ?
            <Ionicons 
              style={{padding: 10, marginRight: 10}}
              name="checkmark-circle-outline" 
              size={20} 
              color="#00DF00" 
            />
          : null }
        </Input>
        <Input style={{marginBottom: 10, backgroundColor: `${error === errorPassword && passwordValid == false ? errorColor : '#E0E0E0'}`}}>
          <TextInput
            placeholder={locale.signup.text_input.password}
            placeholderTextColor="#A4A4A4"
            selectionColor="#FFBF00"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={true}
            returnKeyType="next"
            onChangeText={passwordValidate}
          />
          {passwordStrong == false && passwordValid == true ?
            <Ionicons 
              style={{padding: 10, marginRight: 10}}
              name="alert-circle-outline" 
              size={20} 
              color="#FFBF00" 
            />
          :passwordValid == false && password !== '' ? 
            <Ionicons 
              style={{padding: 10, marginRight: 10}}
              name="alert-circle-outline" 
              size={20} 
              color="#FF0000" 
            />
          :passwordStrong == true && password !== '' ?
            <Ionicons 
              style={{padding: 10, marginRight: 10}}
              name="checkmark-circle-outline" 
              size={20} 
              color="#00DF00" 
            />
          :
            <Ionicons 
              style={{padding: 10, marginRight: 10}}
              name="alert-circle-outline" 
              size={20} 
              color="#00000000" 
            />
          }
        </Input>
        {passwordStrong == false && passwordValid == true ?
          <TextAlert>Password medium</TextAlert>
        :passwordValid == false && password !== '' ? 
         <TextError>Password weak</TextError>
        :passwordStrong == true && password !== '' ?
          <TextValid>Password strong</TextValid>
        :
          <TextError></TextError>
        }
        <Input style={{marginBottom: 10, backgroundColor: `${error === errorPassword && rePasswordValid == false ? errorColor : '#E0E0E0'}`}}>
          <TextInput
            placeholder={locale.signup.text_input.confirm_password}
            placeholderTextColor="#A4A4A4"
            selectionColor="#FFBF00"
            autoCapitalize="none"
            textContentType="newPassword"
            secureTextEntry={true}
            returnKeyType="done"
            onChangeText={rePasswordValidate}
          />
          {rePasswordValid == false && rePassword !== '' ?
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
          {rePasswordValid == true && rePassword !== '' ?
            <Ionicons 
              style={{padding: 10, marginRight: 10}}
              name="checkmark-circle-outline" 
              size={20} 
              color="#00DF00" 
            />
          : null }
        </Input>
        {error ? <TextError>{errorMsg}</TextError>
        : <TextError></TextError>}
        <ButtonPrimary onPress={handleSignUp} accessibilityLabel={locale.signup.button.msg}>
          <TxtButton>{locale.signup.button.text}</TxtButton> 
        </ButtonPrimary>
      </Form>
    </Container>
  );
}
import React, { useState, useContext, useRef } from 'react'
import { TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PropTypes from "prop-types";

import { AuthContext } from '../../../api/firebase'
import {ThemeContext} from '../../../components/theme';
import { LocaleContext } from '../../../components/locale'
import {
  Container,
  Heading,
  View,
  Form,
  Divider,
  Input,
  TextInput,
  H0, H2Mini, P, PMini, Link,
  TxtLink,
  ButtonPrimary,
  ButtonEmpyte,
  ButtonProvider,
  TxtProvider,
  TxtButton,
  TextError,
} from '../../../components/styles';


const SignIn = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {signIn, signGoogle, signFacebook, signGithub} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
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
  };

  const handleGoogle = async () => {
    try {
      await signGoogle();
      navigation.navigate("Loading");
    } catch (error) {
      alert(error.code)
    }
  };
  const handleFacebook = async () => {
    try {
      await signFacebook();
      navigation.navigate("Loading");
    } catch (error) {
      alert(error.code)
    }
  };
  const handleGithub = async () => {
    try {
      await signGithub();
      navigation.navigate("Loading");
    } catch (error) {
      alert(error.code)
    }
  };

  const handleForgot = () => {navigation.navigate('Forgot')}
  const handleSignUp = () => {navigation.navigate('SignUp')}
  const handlePolicy = () => {navigation.navigate('Rules')} 
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <Heading style={{marginBottom: 15}}>
          <H0 style={{marginBottom: 10}}>{locale.global.app.name}</H0>
          <P>{locale.signin.description}</P>
        </Heading>
        <View >
          <ButtonProvider style={styles.shadow} onPress={handleGoogle} accessibilityLabel={locale.providers.button_google.accessibility}>
            <TxtProvider style={{left: 15}}>{locale.providers.button_google.text}</TxtProvider>
            <FontAwesome style={{right: 15}} name="google" size={22} color={theme.text}/>
          </ButtonProvider>
          <ButtonProvider style={{...styles.shadow, marginTop: 15}} onPress={handleFacebook} accessibilityLabel={locale.providers.button_facebook.accessibility}>
            <TxtProvider style={{left: 15}}>{locale.providers.button_facebook.text}</TxtProvider>
            <FontAwesome style={{right: 20}} name="facebook" size={22} color={theme.text}/>
          </ButtonProvider>
          <ButtonProvider style={{...styles.shadow, marginTop: 15}} onPress={handleGithub} accessibilityLabel={locale.providers.button_facebook.accessibility}>
            <TxtProvider style={{left: 15}}>{locale.providers.button_facebook.text}</TxtProvider>
            <FontAwesome style={{right: 15}} name="github" size={24} color={theme.text} />
          </ButtonProvider>
        </View>
        <View style={{width: '90%', flexDirection: 'row', justifiContents: 'center', alignItems: 'center', marginTop: 10}}>
          <Divider />
          <H2Mini>{locale.providers.or}</H2Mini>
          <Divider />
        </View>
        <Form style={{marginTop: 10}}>
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
          <ButtonEmpyte onPress={handleForgot}>
            <TxtLink>{locale.forgot.title}</TxtLink>
          </ButtonEmpyte>
          {error ? <TextError>{errorMsg}</TextError> : <TextError> </TextError> }
          <ButtonPrimary onPress={handleSignIn} accessibilityLabel={locale.signin.button.accessibility}>
            <TxtButton>{locale.signin.button.text}</TxtButton> 
          </ButtonPrimary>
          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <PMini>{locale.signin.button_signup.msg}</PMini>
            <ButtonEmpyte style={{color: '#fff', marginLeft: 5}} onPress={handleSignUp} ccessibilityLabel={locale.signin.button_signup.accessibility}>
              <Link>{locale.signin.button_signup.text}</Link>
            </ButtonEmpyte>
          </View>
        </Form>
        <View style={{marginTop: 90}}>
          <PMini>{locale.welcome.footer}</PMini>
          <ButtonEmpyte style={{color: '#fff'}} onPress={handlePolicy} ccessibilityLabel={locale.global.app.policy_terms.accessibility}>
            <Link>{locale.global.app.policy_terms.title}</Link>
          </ButtonEmpyte>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 4
  }
});

SignIn.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default SignIn;
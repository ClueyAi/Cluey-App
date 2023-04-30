import React, {useState, useContext, useEffect, useRef, useLayoutEffect, useCallback} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PropTypes from "prop-types";

import {AuthContext} from '../../../api/firebase';
import {ThemeContext} from '../../../components/theme';
import {LocaleContext} from '../../../components/locale';
import { 
  Container,
  Heading,
  View,
  Form,
  Divider,
  Input,
  TextInput,
  H0, H2Mini, P, PMini, Link,
  ButtonPrimary,
  TxtButton,
  TxtProvider,
  TextError,
  TextValid,
  TextAlert,
  ButtonEmpyte,
  ButtonProvider
} from '../../../components/styles';

const SignUp = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {signUp, signGoogle, signFacebook, signGithub} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);
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

  const errorColor = "#FFAAAA50"

  const emailValidate = (text) => {
    if (text !== '') {
      // eslint-disable-next-line no-useless-escape
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
  };
  
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

  const handleSignIn = () => {navigation.navigate('SignIn')}
  const handlePolicy = () => {navigation.navigate('Rules')}

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
      });

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <View />
    });
  }, [navigation]);

  useEffect(() => {
    loadData()
  }, [])
  
  return (
    <Container>
      <Heading style={{marginBottom: 15}}>
        <H0 style={{marginBottom: 10}}>{locale.global.app.name}</H0>
        <P>{locale.signup.description}</P>
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
            placeholder={locale.signup.text_input.email}
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
            ref={passwordRef}
            placeholder={locale.signup.text_input.password}
            placeholderTextColor="#A4A4A4"
            selectionColor="#FFBF00"
            autoCapitalize="none"
            autoComplete="new-password"
            secureTextEntry={true}
            returnKeyType="next"
            onChangeText={passwordValidate}
            onSubmitEditing={() => rePasswordRef.current.focus()}
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
            ref={rePasswordRef}
            placeholder={locale.signup.text_input.confirm_password}
            placeholderTextColor="#A4A4A4"
            selectionColor="#FFBF00"
            autoCapitalize="none"
            autoComplete="new-password"
            secureTextEntry={true}
            returnKeyType="done"
            onChangeText={rePasswordValidate}
            onSubmitEditing={handleSignUp}
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
        <ButtonPrimary onPress={handleSignUp} accessibilityLabel={locale.signup.button.accessibility}>
          <TxtButton>{locale.signup.title}</TxtButton> 
        </ButtonPrimary>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <PMini>{locale.signup.button_signin.msg}</PMini>
          <ButtonEmpyte style={{color: '#fff', marginLeft: 5}} onPress={handleSignIn} ccessibilityLabel={locale.signup.button_signin.accessibility}>
            <Link>{locale.signup.button_signin.text}</Link>
          </ButtonEmpyte>
        </View>
      </Form>
      <View style={{marginTop: 20}}>
        <PMini>{locale.welcome.footer}</PMini>
        <ButtonEmpyte style={{color: '#fff'}} onPress={handlePolicy} ccessibilityLabel={locale.global.app.policy_terms.accessibility}>
          <Link>{locale.global.app.policy_terms.title}</Link>
        </ButtonEmpyte>
      </View>
    </Container>
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

SignUp.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default SignUp;
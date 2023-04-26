import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserAvatar from 'react-native-user-avatar';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';

import { UserContext } from '../../../../api/firebase';

import locale from '../../../../components/locale'
import { 
  BgMark,
  LogoBg,
  LogoName,
  Container,
  Header,
  Body,
  Main,
  Div,
  View,
  ScrollView,
  Input,
  TextInput,
  H1, H2, H3, H3Bold, P,
  TxtButton,
  StatusOnline,
  Button,
  ButtonEmpyte,
  WideButton,
  AbsoluteButton,
  Profile,
  Picture,
  ProfilePicture,
  PictureEdit,
  Infor,
  Form,
  TxtLink,
  TextError,
  ButtonPrimary,
  Provider,
  FooterSmall
} from '../../../../components/styles';

export default function ChangeEmail({ navigation })  {
  const [photo, setPhoto] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const errorColor = "#FFAAAA50"

  const { user, signIn, updateUserEmail } = useContext(UserContext);
  const name = user?.email.split("@")[0]

  const handleBack = async () => {navigation.goBack()}

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

  const handleChange = async () => {
    const currentEmail = user?.email
    try {
      if (currentEmail) {
        await signIn(currentEmail, password)
        await updateUserEmail(email)
        navigation.navigate("Loading")
      }
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
  
  useEffect(() => {
    setPhoto(user?.photoURL)
    setUserName(user?.displayName? user?.displayName : name)
  }, [user, setUserName, setPhoto])
  
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container behavior="height">
        <Body>
          <Header style={{marginTop: "8%"}}>
            <Div style={{marginLeft: 20, alignItems: 'flex-start'}}>
              <ButtonEmpyte onPress={handleBack} accessibilityLabel={locale.global.back_button.msg}>
                <Ionicons name="arrow-back-outline" size={28} color="#000000" />
              </ButtonEmpyte>
            </Div>
            <Div style={{minWidth: 60}}>
              <H1>{locale.settings.config.email_config.title}</H1>
            </Div>
            <Div style={{marginRight: 20, alignItems: 'flex-end'}}>
              <ButtonEmpyte>
                <Ionicons name="log-out-outline" size={28} color="#00000000" />
              </ButtonEmpyte>
            </Div>
          </Header>
          <Main style={{marginTop: "15%"}}>
            <Profile style={{flexDirection: 'row', justifyContent: "flex-start", marginLeft: "6%"}}>
              <Picture>
                <ProfilePicture style={{width: 80, height: 80}}>
                  <UserAvatar size={72} style={{width: 72, height: 72, borderRadius: 100}} name={userName} src={photo}/>
                </ProfilePicture>
              </Picture>
              <Infor style={{width: "auto", flexDirection: 'column', alignItems: 'flex-start', marginLeft: 15, marginBottom: 15}}>
                <H3Bold>{userName}</H3Bold>
                <H3>{user?.email}</H3>
              </Infor>  
            </Profile>
            <Div style={{marginTop: 40, justifyContent: 'flex-start', alignItems: 'center'}}>
              <Input style={{width: "90%", marginBottom: 10, backgroundColor: `${error === errorEmail && emailValid == false ? errorColor : '#E0E0E0'}`}}>
                <TextInput
                  placeholder={locale.settings.config.email_config.email}
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
              <Input style={{width: "90%", marginBottom: 10, backgroundColor: `${passwordValid == false ? errorColor : '#E0E0E0'}`}}>
                <TextInput
                  placeholder={locale.settings.config.email_config.password}
                  placeholderTextColor="#A4A4A4"
                  selectionColor="#FFBF00"
                  autoCapitalize="none"
                  textContentType="password"
                  secureTextEntry={true}
                  returnKeyType="next"
                  onChangeText={passwordValidate}
                />
              </Input>
              <ButtonEmpyte onPress={() => navigation.navigate("Forgot")} accessibilityLabel={locale.forgot.button.msg}>
                <TxtLink>{locale.forgot.title}</TxtLink>
              </ButtonEmpyte>
              {error ? <TextError>{errorMsg}</TextError> : <TextError> </TextError> }
              <ButtonPrimary onPress={handleChange} accessibilityLabel={locale.settings.config.email_config.change_button.msg}>
                <TxtButton>{locale.settings.config.email_config.change_button.text}</TxtButton> 
              </ButtonPrimary>
            </Div>
          </Main>
          <FooterSmall>
            <View style={{marginTop: 10}}>
              <H1>{locale.global.app.name}</H1>
            </View>
          </FooterSmall>
        </Body>
      </Container>
    </TouchableWithoutFeedback>
  )
}
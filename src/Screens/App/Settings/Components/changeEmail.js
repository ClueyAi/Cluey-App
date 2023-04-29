import React, { useState, useContext, useEffect, useRef } from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserAvatar from 'react-native-user-avatar';
import PropTypes from "prop-types";


import { UserContext } from '../../../../api/firebase';

import { LocaleContext } from '../../../../components/locale'
import { 
  Container,
  Body,
  Main,
  Div,
  View,
  Input,
  TextInput,
  H1, H3, H3Bold,
  TxtButton,
  ButtonEmpyte,
  Profile,
  Picture,
  ProfilePicture,
  Infor,
  TxtLink,
  TextError,
  ButtonPrimary,
  FooterSmall
} from '../../../../components/styles';

const ChangeEmail = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {user, updateUserEmail} = useContext(UserContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [photo, setPhoto] = useState('');
  const [userName, setUserName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const errorColor = "#FFAAAA50"

  const name = user?.email.split("@")[0]


  const emailValidate = (text) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmailValid(reg.test(text));
    setNewEmail(text)
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
    try {
      await updateUserEmail(password, newEmail)
      navigation.navigate('Loading')
    } catch (error) {
      setError(error.code)
      if (error.code === "auth/missing-password") {
        setErrorMsg(locale.error.auth_missing_password)
        setPasswordValid(false)
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg(locale.error.auth_wrong_password)
        setPasswordValid(false)
      } else if (error.code === "auth/user-not-found") {
        setErrorEmail(error.code)
        setErrorMsg(locale.error.auth_user_not_found)
        setEmailValid(false)
      }  else if (error.code === "auth/missing-email") {
        setErrorMsg(locale.error.auth_missing_email)
        setPasswordValid(false)
      } else if (error.code === "auth/invalid-email") {
        setErrorEmail(error.code)
        setErrorMsg(locale.error.auth_invalid_email)
        setEmailValid(false)
      } else {
        setErrorEmail(error.code)
        setErrorMsg(locale.error.auth_connect_user)
        setEmailValid(emailValid == true? true: false)
        setPasswordValid(passwordValid == true? true: false)
      }
    }
  };

  const handleForgot = () => {
    navigation.navigate("AuthStackNavigator", {screen: 'Forgot'})
  };

  useEffect(() => {
    setPhoto(user?.photoURL)
    setUserName(user?.displayName? user?.displayName : name)
  }, [user, setUserName, setPhoto])
  
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container behavior="height">
        <Body>
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
                  ref={emailRef}
                  value={newEmail}
                  placeholder={locale.settings.config.email_config.email}
                  placeholderTextColor="#A4A4A4"
                  selectionColor="#FFBF00"
                  autoCapitalize="none"
                  autoComplete="email"
                  returnKeyType="next"
                  onChangeText={emailValidate}
                  onSubmitEditing={() => passwordRef.current.focus()}
                />
                {emailValid == false && newEmail !== '' ?
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
                {emailValid == true && newEmail !== '' ?
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
                  ref={passwordRef}
                  placeholder={locale.settings.config.email_config.password}
                  placeholderTextColor="#A4A4A4"
                  selectionColor="#FFBF00"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  secureTextEntry={true}
                  returnKeyType="done"
                  onChangeText={passwordValidate}
                  onSubmitEditing={handleChange}
                />
              </Input>
              <ButtonEmpyte onPress={() => {handleForgot}} accessibilityLabel={locale.forgot.button.accessibility}>
                <TxtLink>{locale.forgot.title}</TxtLink>
              </ButtonEmpyte>
              {error ? <TextError>{erroraccessibility}</TextError> : <TextError> </TextError> }
              <ButtonPrimary onPress={handleChange} accessibilityLabel={locale.settings.config.email_config.change_button.accessibility}>
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
  );
};

ChangeEmail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ChangeEmail;
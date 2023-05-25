import React, { useState, useContext, useRef } from "react";
import { TouchableWithoutFeedback, Keyboard, StyleSheet, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserAvatar from "react-native-user-avatar";
import PropTypes from "prop-types";

import { UserContext, FirestoreContext } from "../../../../../api/firebase";
import { ThemeContext } from "../../../../../components/theme";
import { LocaleContext } from "../../../../../components/locale";
import {
  Container,
  Heading,
  Body,
  Main,
  Form,
  View,
  Input,
  TextInput,
  H0,
  H1,
  H3,
  H3Bold,
  P,
  TxtButton,
  ButtonEmpyte,
  Profile,
  Picture,
  ProfilePicture,
  Infor,
  TxtLink,
  TextError,
  ButtonPrimary,
  FooterSmall,
} from "../../../../../components/styles";

const Email = ({ navigation }) => {
  const { locale } = useContext(LocaleContext);
  const { updateUserEmail } = useContext(UserContext);
  const { user } = useContext(FirestoreContext);
  const { theme } = useContext(ThemeContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);

  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const emailValidate = (text) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmailValid(reg.test(text));
    setNewEmail(text);
  };

  const passwordValidate = (text) => {
    if (emailValid == true) {
      setPasswordValid(true);
      setPassword(text);
    } else {
      setPasswordValid(false);
    }
  };

  const confirmation = () => {
    return Alert.alert(
      locale.alert.email_change.title,
      locale.alert.email_change.message,
      [
        {
          text: locale.alert.ok,
          onPress: async () => {
            try {
              navigation.navigate('Loading');
            } catch (error) {
              Alert.alert(error.message)
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleChange = async () => {
    try {
      await updateUserEmail(password, newEmail);
      confirmation();
    } catch (error) {
      setError(error.code);
      if (error.code === "auth/missing-password") {
        setErrorMsg(locale.error.auth_missing_password);
        setPasswordValid(false);
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg(locale.error.auth_wrong_password);
        setPasswordValid(false);
      } else if (error.code === "auth/user-not-found") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_user_not_found);
        setEmailValid(false);
      } else if (error.code === "auth/missing-email") {
        setErrorMsg(locale.error.auth_missing_email);
        setPasswordValid(false);
      } else if (error.code === "auth/invalid-email") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_invalid_email);
        setEmailValid(false);
      } else {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_connect_user);
        setEmailValid(emailValid == true ? true : false);
        setPasswordValid(passwordValid == true ? true : false);
      }
    }
  };

  const handleForgot = () => {
    navigation.navigate("AuthStackNavigator", { screen: "Forgot" });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container behavior="height">
        <Heading style={{ marginTop: 40, marginBottom: 10 }}>
          <H0 style={{ marginBottom: 5 }}>{locale.email_config.title}</H0>
          <P>{locale.email_config.subtitle}</P>
        </Heading>
        <Body>
          <Main>
            <Profile
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                marginLeft: "6%",
              }}
            >
              <Picture>
                <ProfilePicture style={{ width: 80, height: 80 }}>
                  <UserAvatar
                    size={72}
                    style={{ width: 72, height: 72, borderRadius: 100 }}
                    name={user?.profile?.displayName}
                    src={user?.profile?.photoURL ? user?.profile?.photoURL : null}
                  />
                </ProfilePicture>
              </Picture>
              <Infor
                style={{
                  width: "auto",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: 15,
                  marginBottom: 15,
                }}
              >
                <H3Bold>{user?.profile.displayName}</H3Bold>
                <H3>{user?.profile.email}</H3>
              </Infor>
            </Profile>
            <Form style={{flex: 1, marginTop: 40, alignSelf: 'center'}}>
              <Input
                style={{
                  ...styles.shadow,
                  marginBottom: 15,
                  backgroundColor: `${
                    error === errorEmail && emailValid == false
                      ? theme.inputError
                      : theme.backgroundSecondary
                  }`,
                }}
              >
                <TextInput
                  ref={emailRef}
                  value={newEmail}
                  placeholder={locale.email_config.email}
                  placeholderTextColor={theme.placeholder}
                  selectionColor={theme.primary}
                  autoCapitalize="none"
                  autoComplete="email"
                  returnKeyType="next"
                  onChangeText={emailValidate}
                  onSubmitEditing={() => passwordRef.current.focus()}
                />
                {emailValid == false && newEmail !== "" ? (
                  <Ionicons
                    style={{ padding: 10, marginRight: 10 }}
                    name="alert-circle-outline"
                    size={20}
                    color={theme.error}
                  />
                ) : (
                  <Ionicons
                    style={{ padding: 10, marginRight: 10 }}
                    name="alert-circle-outline"
                    size={20}
                    color={theme.transparent}
                  />
                )}
                {emailValid == true && newEmail !== "" ? (
                  <Ionicons
                    style={{ padding: 10, marginRight: 10 }}
                    name="checkmark-circle-outline"
                    size={20}
                    color={theme.secondary}
                  />
                ) : null}
              </Input>
              <Input
                style={{
                  ...styles.shadow,
                  marginBottom: 10,
                  backgroundColor: `${
                    passwordValid == false ? theme.inputError : theme.backgroundSecondary
                  }`,
                }}
              >
                <TextInput
                  ref={passwordRef}
                  placeholder={locale.email_config.password}
                  placeholderTextColor={theme.placeholder}
                  selectionColor={theme.primary}
                  autoCapitalize="none"
                  autoComplete="current-password"
                  secureTextEntry={true}
                  returnKeyType="done"
                  onChangeText={passwordValidate}
                  onSubmitEditing={handleChange}
                />
              </Input>
              <ButtonEmpyte onPress={handleForgot}>
                <TxtLink>{locale.forgot.title}</TxtLink>
              </ButtonEmpyte>
              {error ? (
                <TextError>{errorMsg}</TextError>
              ) : (
                <TextError> </TextError>
              )}
              <ButtonPrimary
                style={styles.shadow}
                onPress={handleChange}
                accessibilityLabel={locale.email_config.change_button.accessible}
              >
                <TxtButton>{locale.email_config.change_button.text}</TxtButton>
              </ButtonPrimary>
            </Form>
          </Main>
          <FooterSmall>
            <View style={{ marginTop: 10 }}>
              <H1>{locale.global.app.name}</H1>
            </View>
          </FooterSmall>
        </Body>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});

Email.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Email;

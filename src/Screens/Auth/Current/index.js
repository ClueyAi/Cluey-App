import React, { useState, useContext, useRef } from "react";
import { StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import PropTypes from "prop-types";

import { LocaleContext } from "../../../components/locale";
import { AuthContext } from "../../../api/firebase";
import { ProvidersContext } from "../../../api/providers";
import { FirestoreContext } from "../../../api/firebase";
import { ThemeContext } from "../../../components/theme";
import {
  Avoiding,
  Container,
  Content,
  Heading,
  Body,
  Providers,
  View,
  Form,
  Divider,
  Input,
  TextInput,
  H0,
  H2Mini,
  P,
  PMini,
  Link,
  TxtLink,
  ButtonPrimary,
  ButtonEmpyte,
  ButtonProvider,
  TxtProvider,
  TxtButton,
  TextError,
} from "../../../components/styles";

const Current = ({ navigation }) => {
  const { locale } = useContext(LocaleContext);
  const { signIn } = useContext(AuthContext);
  const { putUser } = useContext(FirestoreContext);
  const { signInWithGoogle } = useContext(ProvidersContext);
  const { theme } = useContext(ThemeContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);

  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [errorPassword, setErrorPassword] = useState("");

  const emailValidate = (text) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmailValid(reg.test(text));
    setEmail(text);
  };

  const passwordValidate = (text) => {
    if (emailValid == true) {
      setPasswordValid(true);
      setPassword(text);
    } else {
      setPasswordValid(false);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      await putUser();
      await navigation.navigate("Loading");
    } catch (error) {
      setError(error.code);
      if (error.code === "auth/missing-password") {
        setErrorPassword(error.code);
        setErrorMsg(locale.error.auth_missing_password);
        setPasswordValid(false);
      } else if (error.code === "auth/wrong-password") {
        setErrorPassword(error.code);
        setErrorMsg(locale.error.auth_wrong_password);
        setPasswordValid(false);
      } else if (error.code === "auth/user-not-found") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_user_not_found);
        setEmailValid(false);
      } else if (error.code === "auth/invalid-email") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_invalid_email);
        setEmailValid(false);
      } else {
        setErrorPassword(error.code);
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_connect_user);
        setEmailValid(emailValid == true ? true : false);
        setPasswordValid(passwordValid == true ? true : false);
      }
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };
  const handleFacebook = async () => {
    alert("Facebook");
  };
  const handleGithub = async () => {
    alert("Github");
  };

  const handleShowPassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleForgot = () => {
    navigation.navigate("Forgot");
  };
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };
  const handlePolicy = () => {
    navigation.navigate("Rules");
  };

  return (
    <Container>
      <Avoiding
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={88}
      >
        <Content>
          <Body>
            <Heading style={{ marginBottom: 15, marginTop: 10 }}>
              <H0 style={{ marginBottom: 10 }}>{locale.global.app.name}</H0>
              <P>{locale.signin.description}</P>
            </Heading>
            {/*
            <Providers>
              <ButtonProvider
                style={styles.shadow}
                onPress={handleGoogle}
                accessibilityLabel={
                  locale.providers.button_google.accessibility
                }
              >
                <TxtProvider style={{ left: 30 }}>
                  {locale.providers.button_google.text}
                </TxtProvider>
                <FontAwesome
                  style={{ right: 30 }}
                  name="google"
                  size={22}
                  color={theme.text}
                />
              </ButtonProvider>
              <ButtonProvider
                style={{ ...styles.shadow, marginTop: 15 }}
                onPress={handleFacebook}
                accessibilityLabel={
                  locale.providers.button_facebook.accessibility
                }
              >
                <TxtProvider style={{ left: 30 }}>
                  {locale.providers.button_facebook.text}
                </TxtProvider>
                <FontAwesome
                  style={{ right: 34 }}
                  name="facebook"
                  size={22}
                  color={theme.text}
                />
              </ButtonProvider>
              <ButtonProvider
                style={{ ...styles.shadow, marginTop: 15 }}
                onPress={handleGithub}
                accessibilityLabel={
                  locale.providers.button_github.accessibility
                }
              >
                <TxtProvider style={{ left: 30 }}>
                  {locale.providers.button_github.text}
                </TxtProvider>
                <FontAwesome
                  style={{ right: 30 }}
                  name="github"
                  size={24}
                  color={theme.text}
                />
              </ButtonProvider>
            </Providers>
            <View
              style={{
                width: "90%",
                flexDirection: "row",
                justifiContents: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Divider />
              <H2Mini>{locale.providers.or}</H2Mini>
              <Divider />
            </View>
            */}
            <Form style={{ marginTop: 20 }}>
              <Input
                style={{
                  ...styles.shadow,
                  borderColor: theme.text,
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
                  placeholder={locale.signin.text_input.email}
                  placeholderTextColor={theme.placeholder}
                  selectionColor={theme.primary}
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputMode="email"
                  autoComplete="email"
                  maxLength={100}
                  returnKeyType="next"
                  onChangeText={emailValidate}
                  onSubmitEditing={() => passwordRef.current.focus()}
                />
                {emailValid == false && email !== "" ? (
                  <Ionicons
                    style={{ padding: 10, marginRight: 5 }}
                    name="alert-circle-outline"
                    size={20}
                    color={theme.error}
                  />
                ) : (
                  <Ionicons
                    style={{ padding: 10, marginRight: 5 }}
                    name="alert-circle-outline"
                    size={20}
                    color={theme.transparent}
                  />
                )}
                {emailValid == true && email !== "" ? (
                  <Ionicons
                    style={{ padding: 10, marginRight: 5 }}
                    name="checkmark-circle-outline"
                    size={20}
                    color={theme.secondary}
                  />
                ) : null}
              </Input>
              <Input
                style={{
                  ...styles.shadow,
                  borderColor: theme.text,
                  marginBottom: 10,
                  backgroundColor: `${
                    passwordValid == false ? theme.inputError : theme.backgroundSecondary
                  }`,
                }}
              >
                <TextInput
                  ref={passwordRef}
                  placeholder={locale.signin.text_input.password}
                  placeholderTextColor={theme.placeholder}
                  selectionColor={theme.primary}
                  autoCapitalize="none"
                  autoComplete="current-password"
                  maxLength={22}
                  secureTextEntry={secureTextEntry}
                  returnKeyType="done"
                  onChangeText={passwordValidate}
                  onSubmitEditing={handleSignIn}
                />
                <ButtonEmpyte style={{marginRight: 15}} onPress={handleShowPassword}>
                  <Ionicons name={secureTextEntry? 'eye-outline': 'eye-off-outline'} size={20} color={theme.text} />
                </ButtonEmpyte>
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
                onPress={handleSignIn}
                accessibilityLabel={locale.signin.button.accessibility}
              >
                <TxtButton>{locale.signin.button.text}</TxtButton>
              </ButtonPrimary>
              <View style={{ marginTop: 20, flexDirection: "row" }}>
                <PMini>{locale.signin.button_signup.msg}</PMini>
                <ButtonEmpyte
                  style={{ marginLeft: 5 }}
                  onPress={handleSignUp}
                  ccessibilityLabel={locale.signin.button_signup.accessibility}
                >
                  <Link>{locale.signin.button_signup.text}</Link>
                </ButtonEmpyte>
              </View>
            </Form>
          </Body>
          <View style={{ marginTop: "15%", alignItems: "center" }}>
            <PMini>{locale.welcome.footer}</PMini>
            <ButtonEmpyte
              onPress={handlePolicy}
              ccessibilityLabel={locale.global.app.policy_terms.accessibility}
            >
              <Link>{locale.global.app.policy_terms.title}</Link>
            </ButtonEmpyte>
          </View>
        </Content>
      </Avoiding>
    </Container>
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

Current.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Current;

import React, { useState, useContext } from "react";
import { Platform, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from "prop-types";

import { AuthContext } from "../../../api/firebase";
import { ThemeContext } from "../../../components/theme";

import { LocaleContext } from "../../../components/locale";
import {
  Avoiding,
  Container,
  Content,
  Heading,
  Body,
  View,
  Form,
  Input,
  Link,
  ButtonEmpyte,
  TextInput,
  H1,
  H3,
  P,
  PMini,
  ButtonPrimary,
  TxtButton,
  TextError,
  FooterSmall,
} from "../../../components/styles";

const Forgot = ({ navigation }) => {
  const { locale } = useContext(LocaleContext);
  const { forgot } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);

  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [sendRecovery, setSendRecovery] = useState(false);

  const emailValidate = (text) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmailValid(reg.test(text));
    setEmail(text);
  };

  const handleForgot = async () => {
    try {
      await forgot(email);
      setSendRecovery(true);
    } catch (error) {
      setError(error.code);
      if (error.code === "auth/user-not-found") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_user_not_found);
        setEmailValid(false);
      }
      if (error.code === "auth/invalid-email") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_invalid_email);
        setEmailValid(false);
      }
    }
  };

  const handleContinue = () => {
    navigation.navigate("Loading");
  };

  const handlePolicy = () => {
    navigation.navigate("Rules");
  };

  if (sendRecovery == false) {
    return (
      <Container>
        <Avoiding
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={88}
        >
          <Content>
            <Body>
              <Heading style={{ marginTop: "45%", marginBottom: 15 }}>
                <H1 style={{ marginBottom: 10 }}>{locale.forgot.title}</H1>
                <P>{locale.forgot.description}</P>
              </Heading>
              <Form>
                <Input
                  style={{
                  ...styles.shadow,
                  borderWidth: 0.1,
                  marginBottom: 10,
                  backgroundColor: `${
                    error === errorEmail && emailValid == false
                      ? theme.inputError
                      : theme.backgroundSecondary
                  }`,
                }}
                >
                  <TextInput
                    placeholder={locale.forgot.text_input.email}
                    placeholderTextColor={theme.placeholder}
                    selectionColor={theme.primary}
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputMode="email"
                    autoComplete="email"
                    maxLength={100}
                    returnKeyType="done"
                    onChangeText={emailValidate}
                    onSubmitEditing={handleForgot}
                  />
                  {emailValid == false ? (
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
                  {emailValid == true ? (
                    <Ionicons
                      style={{ padding: 10, marginRight: 10 }}
                      name="checkmark-circle-outline"
                      size={20}
                      color={theme.secondary}
                    />
                  ) : null}
                </Input>
                {error ? (
                  <TextError>{errorMsg}</TextError>
                ) : (
                  <TextError></TextError>
                )}
                <ButtonPrimary
                  style={styles.shadow}
                  onPress={handleForgot}
                  accessibilityLabel={locale.forgot.button.accessibility}
                >
                  <TxtButton>{locale.forgot.button.text}</TxtButton>
                </ButtonPrimary>
              </Form>
            </Body>
            <View style={{ marginTop: "70%", alignItems: "center" }}>
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
  } else {
    return (
      <Container>
        <Heading style={{ marginTop: "45%", marginBottom: 15 }}>
          <H1 style={{ marginBottom: 10, fontSize: 25 }}>
            {locale.forgot.success.title}
          </H1>
          <P>{locale.forgot.success.description}</P>
          <H3 style={{ marginTop: 30, marginBottom: 5 }}>
            {locale.forgot.success.alert_tittle}
          </H3>
          <PMini>{locale.forgot.success.alert_msg}</PMini>
        </Heading>
        <ButtonPrimary
          style={{...styles.shadow, marginTop: 10, marginBottom: "40%" }}
          onPress={handleContinue}
          accessibilityLabel={locale.forgot.success.Button.accessibility}
        >
          <TxtButton>{locale.forgot.success.Button.text}</TxtButton>
        </ButtonPrimary>
        <FooterSmall>
          <H1 style={{ marginTop: 10 }}>{locale.global.app.name}</H1>
        </FooterSmall>
      </Container>
    );
  }
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

Forgot.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Forgot;

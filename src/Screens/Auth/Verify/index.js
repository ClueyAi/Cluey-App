import React, { useState, useContext, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from "prop-types";

import { AuthContext } from "../../../api/firebase";

import { LocaleContext } from "../../../components/locale";
import {
  Container,
  Heading,
  View,
  H1,
  H3,
  P,
  PMini,
  TxtButton,
  ButtonPrimary,
  ButtonEmpyte,
  ActivityIndicator,
  Link,
} from "../../../components/styles";

const Verify = ({ navigation }) => {
  const { user, emailVerify } = useContext(AuthContext);
  const { locale } = useContext(LocaleContext);
  const [dev, setDev] = useState(false);
  const [devSure, setDevSure] = useState(false);

  const handleSendEmailVerify = async () => {
    if (!user?.emailVerified) {
      emailVerify();
    }
  };
  const handleContinue = async () => {
    navigation.navigate("Loading");
  };

  const handleDev1 = async () => {
    setDev(true);
  };
  const handleDev2 = async () => {
    setDevSure(true);
  };
  const handleDev3 = async () => {
    if (devSure) {
      navigation.navigate("AppStackNavigator");
    }
    console.log("is verifild?", user?.emailVerified);
    console.log("dev mod:", dev);
  };

  useEffect(() => {
    setDev(false);
  }, [user]);

  return (
    <Container>
      {/*Dev */}
      <ButtonEmpyte
        style={{
          position: "absolute",
          top: 100,
          left: 100,
          zIndex: 9999,
          padding: 20,
          backgroundColor: dev ? "#000000" : null,
        }}
        onPress={handleDev1}
      ></ButtonEmpyte>
      <ButtonEmpyte
        style={{
          position: "absolute",
          bottom: 100,
          right: 100,
          zIndex: 9999,
          padding: 20,
          backgroundColor: devSure ? "#000000" : null,
        }}
        onPress={handleDev2}
        onLongPress={handleDev3}
      ></ButtonEmpyte>
      {/*Dev */}
      <Heading style={{ marginTop: "10%", marginBottom: 15 }}>
        <H1 style={{ marginBottom: 10, fontSize: 25 }}>
          {locale.custom.verify.title}
        </H1>
        <P>{locale.forgot.success.description}</P>
        <H3 style={{ marginTop: 30, marginBottom: 5 }}>
          {locale.forgot.success.alert_tittle}
        </H3>
        <PMini>{locale.forgot.success.alert_msg}</PMini>
      </Heading>
      <ButtonEmpyte
        style={{ marginTop: 10 }}
        onPress={handleSendEmailVerify}
        accessibilityLabel={locale.custom.verify.verify_button.msg}
      >
        <Link>{locale.custom.verify.verify_button.text}</Link>
      </ButtonEmpyte>
      <ButtonPrimary
        style={{ marginTop: 15 }}
        onPress={handleContinue}
        accessibilityLabel={locale.custom.verify.continue_button.msg}
      >
        <TxtButton>{locale.custom.verify.continue_button.text}</TxtButton>
      </ButtonPrimary>
      {user?.emailVerified ? (
        <View style={{ marginTop: "25%" }}>
          <Ionicons name="checkmark" size={35} color="#2ECC71" />
        </View>
      ) : (
        <View>
          <ActivityIndicator
            style={{
              marginTop: "25%",
              transform: [{ scaleX: 2 }, { scaleY: 2 }],
            }}
          />
        </View>
      )}
    </Container>
  );
};

Verify.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Verify;

import React, { useContext } from "react";
import PropTypes from "prop-types";

import { AuthContext } from "../../../api/firebase";

import { LocaleContext } from "../../../components/locale";
import {
  Container,
  Heading,
  H1,
  H2,
  P,
  TxtButton,
  ButtonPrimary,
} from "../../../components/styles";

const Blank = ({ navigation }) => {
  const { locale } = useContext(LocaleContext);
  const { emailVerify } = useContext(AuthContext);

  const handleEmailVerify = async () => {
    emailVerify();
    navigation.navigate("Loading");
  };

  return (
    <Container>
      <Heading style={{ marginTop: "50%", marginBottom: 15 }}>
        <H1 style={{ marginBottom: 10, fontSize: 25 }}>
          {locale.custom.Verify.title}
        </H1>
        <P>{locale.forgot.success.description}</P>
        <H2 style={{ marginTop: 30, marginBottom: 15 }}>
          {locale.forgot.success.alert_tittle}
        </H2>
        <P>{locale.forgot.success.alert_accessibility}</P>
      </Heading>
      <ButtonPrimary
        onPress={handleEmailVerify}
        accessibilityLabel={locale.forgot.success.Button.accessibility}
      >
        <TxtButton>{locale.forgot.success.Button.text}</TxtButton>
      </ButtonPrimary>
    </Container>
  );
};

Blank.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Blank;

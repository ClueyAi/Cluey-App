import React, { useState, useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from "prop-types";

import { AuthContext, FirestoreContext } from "../../../api/firebase";
import { ThemeContext } from "../../../components/theme";
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
  const { emailVerify } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(FirestoreContext);
  const { locale } = useContext(LocaleContext);
  const [loading, setLoading] = useState(false);

  const profile = user?.profile;

  const handleRefresh = async () => {
    setLoading(true);
    await profile?.reload();
    setLoading(false);
  };

  const handleSendEmailVerify = async () => {
    if (!profile?.emailVerified) {
      emailVerify();
    }
  };
  const handleContinue = async () => {
    handleRefresh();
    if (loading) {
      console.log("loading");
    } else {
      console.log("not loading");
    }
    navigation.navigate("Loading");
  };

  return (
    <Container>
      <Heading style={{ marginTop: "10%", marginBottom: 15 }}>
        <H1 style={{ marginBottom: 10, fontSize: 25 }}>
          {locale.verify.title}
        </H1>
        <P>{locale.forgot.success.description}</P>
        <H3 style={{ marginTop: 30, marginBottom: 5 }}>
          {locale.forgot.success.alert_tittle}
        </H3>
        <PMini>{locale.forgot.success.alert_accessibility}</PMini>
      </Heading>
      <ButtonEmpyte
        style={{ marginTop: 10 }}
        onPress={handleSendEmailVerify}
        accessibilityLabel={locale.verify.verify_button.accessibility}
      >
        <Link>{locale.verify.verify_button.text}</Link>
      </ButtonEmpyte>
      <ButtonPrimary
        style={{ marginTop: 15 }}
        onPress={handleContinue}
        accessibilityLabel={locale.verify.continue_button.accessibility}
      >
        <TxtButton>{locale.verify.continue_button.text}</TxtButton>
      </ButtonPrimary>
      {profile?.emailVerified ? (
        <View style={{ marginTop: "25%" }}>
          <Ionicons name="checkmark" size={35} color={theme.secondary} />
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

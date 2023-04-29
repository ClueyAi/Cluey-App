import React, { useState, useEffect, useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

import { LocaleContext } from "../../../components/locale";
import {
  Container,
  Body,
  View,
  ScrollView,
  H1,
  H3Bold,
  Tittle,
  Text,
  TextList,
  ButtonEmpyte,
  FooterSmall,
  AbsoluteButton,
} from "../../../components/styles";

export default function PolicyTerms({ navigation }) {
  const { locale } = useContext(LocaleContext);
  const [isPolicy, setIsPolicy] = useState(true);
  const [policyColor, setPolicyColor] = useState(FocusColor);
  const [termsColor, setTermsColor] = useState(DefaultColor);

  const DefaultColor = "#A5A5A5";
  const FocusColor = "#454545";

  const handlePolicy = () => {
    setIsPolicy(true);
  };
  const handleTerms = () => {
    setIsPolicy(false);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (isPolicy) {
      setPolicyColor(FocusColor);
      setTermsColor(DefaultColor);
    } else {
      setPolicyColor(DefaultColor);
      setTermsColor(FocusColor);
    }
  }, [isPolicy]);

  return (
    <Container>
      <AbsoluteButton style={{ top: 45, left: 10, flexDirection: "row" }}onPress={handleGoBack}>
        <Ionicons name="chevron-back" size={28} color="#FFBF00" />
        <AntDesign name="home" size={16} color="#FFBF00" />
      </AbsoluteButton>
      <Body style={{ marginTop: "20%" }}>
        <View
          style={{
            flexDirection: "row",
            justifiContent: "space-between",
            alignItems: "center",
          }}
        >
          <ButtonEmpyte
            style={{
              paddingRight: 5,
              paddingTop: 20,
              paddingLeft: 20,
              paddingBottom: 10,
            }}
            onPress={handlePolicy}
          >
            <H3Bold style={{ color: policyColor }}>
              {locale.global.app.policy_terms.policy.title}
            </H3Bold>
          </ButtonEmpyte>
          <H3Bold
            style={{
              paddingHorizontal: 5,
              paddingTop: 20,
              paddingBottom: 10,
              color: "#A5A5A5",
            }}
          >
            |
          </H3Bold>
          <ButtonEmpyte
            style={{
              paddingRight: 20,
              paddingTop: 20,
              paddingLeft: 5,
              paddingBottom: 10,
            }}
            onPress={handleTerms}
          >
            <H3Bold style={{ color: termsColor }}>
              {locale.global.app.policy_terms.terms.title}
            </H3Bold>
          </ButtonEmpyte>
        </View>
        {isPolicy ? (
          <ScrollView style={{ paddingHorizontal: 20 }}>
            <Text>{locale.global.app.policy_terms.policy.p1}</Text>
            <Text>{locale.global.app.policy_terms.policy.p2}</Text>
            <Text>{locale.global.app.policy_terms.policy.p3}</Text>
            <Text>{locale.global.app.policy_terms.policy.p4}</Text>
            <Text>{locale.global.app.policy_terms.policy.p5}</Text>
            <Text>{locale.global.app.policy_terms.policy.p6}</Text>
            <Text>{locale.global.app.policy_terms.policy.p7}</Text>
            <Text>{locale.global.app.policy_terms.policy.p8}</Text>
          </ScrollView>
        ) : (
          <ScrollView style={{ paddingHorizontal: 20 }}>
            <Tittle>{locale.global.app.policy_terms.terms.t1}</Tittle>
            <Text>{locale.global.app.policy_terms.terms.p1}</Text>
            <Tittle>{locale.global.app.policy_terms.terms.t2}</Tittle>
            <Text>{locale.global.app.policy_terms.terms.p2}</Text>
            <TextList>
              2.1. {locale.global.app.policy_terms.terms["p2.1"]}
            </TextList>
            <TextList>
              2.2. {locale.global.app.policy_terms.terms["p2.2"]}
            </TextList>
            <TextList>
              2.3. {locale.global.app.policy_terms.terms["p2.3"]}
            </TextList>
            <TextList>
              2.4. {locale.global.app.policy_terms.terms["p2.4"]}
            </TextList>
            <TextList>
              2.5. {locale.global.app.policy_terms.terms["p2.5"]}
            </TextList>
            <TextList>
              2.6. {locale.global.app.policy_terms.terms["p2.6"]}
            </TextList>
            <Tittle>{locale.global.app.policy_terms.terms.t3}</Tittle>
            <Text>{locale.global.app.policy_terms.terms.p3}</Text>
            <Tittle>{locale.global.app.policy_terms.terms.t4}</Tittle>
            <Text>{locale.global.app.policy_terms.terms.p4}</Text>
            <Tittle>{locale.global.app.policy_terms.terms.t5}</Tittle>
            <Text>{locale.global.app.policy_terms.terms.p5}</Text>
            <Tittle>{locale.global.app.policy_terms.terms.t6}</Tittle>
            <Text>{locale.global.app.policy_terms.terms.p6}</Text>
            <Tittle>{locale.global.app.policy_terms.terms.t7}</Tittle>
            <Text>{locale.global.app.policy_terms.terms.p7}</Text>
            <Tittle>{locale.global.app.policy_terms.terms.t8}</Tittle>
            <Text>{locale.global.app.policy_terms.terms.p8}</Text>
          </ScrollView>
        )}
      </Body>
      <FooterSmall>
        <H1 style={{ marginTop: 10 }}>{locale.global.app.name}</H1>
      </FooterSmall>
    </Container>
  );
}

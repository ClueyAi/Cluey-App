import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AuthContext } from '../../../api/firebase'

import { LocaleContext } from '../../../components/locale'
import { 
  Container,
  Heading,
  View,
  H1, H3, P, PMini,
  TxtButton,
  LogoutButton,
  ButtonPrimary,
  ButtonSecondary,
  ButtonEmpyte,
  ActivityIndicator
} from '../../../components/styles';

const Verify = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {user, emailVerify, signOut} = useContext(AuthContext);
  const [error, setError] = useState('');
  const [verify, setVerify] = useState();
  const [dev, setDev] = useState(false);
  const [devSure, setDevSure] = useState(false);


  const emailVerified = user?.emailVerified

  const isVerify = useCallback(() => {
    if (emailVerified) {
      setVerify(true)
    } else {
      setVerify(false)
    }
  }, [emailVerified])

  const handleLogout = async () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to log out of your account?",
      [
        {
          text: "Yes",
          onPress: async () => {
            try {
              await signOut()
              navigation.navigate("Loading")
            } catch (error) {
              setError(error.message)
            }
            if (error) {
              Alert.alert(error)
            }
          },
        },
        {
          text: "No",
        },
      ],
    )
  }

  const handleSendEmailVerify = async () => {
    isVerify()
    if (!emailVerified) {
      emailVerify()
    }
  }
  const handleContinue = async () => {navigation.navigate("Loading")}

  const handleDev1 = async () => {
    setDev(true)
  }
  const handleDev2 = async () => {
    setDevSure(true)
  }
  const handleDev3 = async () => {
    if (devSure) {
      navigation.navigate("Home")
    }
    console.log("is verifild?", user?.emailVerified)
    console.log("dev mod:", dev)
  }

  useEffect(() => {
    isVerify()
    setDev(false)
  }, [setDev, isVerify])
  
  return(
    <Container>
        {/*Dev */}
          <ButtonEmpyte
            style={{position: "absolute", top: 100, left: 100, zIndex: 9999, padding: 20, backgroundColor: dev ? "#000000" : null}}
            onPress={handleDev1}
          >
          </ButtonEmpyte>
          <ButtonEmpyte
            style={{position: "absolute", bottom: 100, right: 100, zIndex: 9999, padding: 20, backgroundColor: devSure ? "#000000" : null}}
            onPress={handleDev2}
            onLongPress={handleDev3}
          >
          </ButtonEmpyte>
        {/*Dev */}
        <LogoutButton onPress={handleLogout} accessibilityLabel={locale.logout.msg}>
          <Ionicons name="log-out-outline" size={28} color="#000000" />
        </LogoutButton>
        <Heading style={{marginTop: '50%', marginBottom: 15}}>
          <H1 style={{marginBottom: 10, fontSize: 25}}>{locale.custom.verify.title}</H1>
          <P>{locale.forgot.success.description}</P>
          <H3 style={{marginTop: 30 ,marginBottom: 5}}>{locale.forgot.success.alert_tittle}</H3>
          <PMini>{locale.forgot.success.alert_msg}</PMini>
        </Heading>
        <ButtonSecondary style={{marginTop: 10}} onPress={handleSendEmailVerify} accessibilityLabel={locale.custom.verify.verify_button.msg}>
          <TxtButton>{locale.custom.verify.verify_button.text}</TxtButton> 
        </ButtonSecondary>
        {verify ?
          <View style={{marginTop: '25%'}}>
            <Ionicons name="checkmark" size={35} color="#2ECC71" />
          </View>
        :
          <View>
            <ActivityIndicator
              style={{marginTop: '25%', transform: [{ scaleX: 2 }, { scaleY: 2 }]}}
            />
          </View>
        }
        {verify ?
          <ButtonPrimary style={{marginTop: "25%"}} onPress={handleContinue} accessibilityLabel={locale.custom.verify.continue_button.msg}>
            <TxtButton>{locale.custom.verify.continue_button.text}</TxtButton> 
          </ButtonPrimary>
        
        :
          null
        }
      </Container>
  );
};

export default Verify;
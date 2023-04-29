import React, { useState, useContext } from 'react'
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { AuthContext } from '../../../api/firebase';

import locale from '../../../components/locale'
import { 
  Container,
  Heading,
  H1, H2, P,
  TxtButton,
  ButtonPrimary,
} from '../../../components/styles';

export default function Blank({ navigation })  {
  const {user, emailVerify, signOut} = useContext(AuthContext);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);


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
  const handleEditPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }
  const handleEmailVerify = async () => {emailVerify()}
  const handleEditName = async () => {}
  const handleChangeEmail = async () => {}
  const handleChangePassword = async () => {}
  const handleCoutry = async () => {}
  const handlePreferences = async () => {}
  const handleAbout = async () => {navigation.navigate("About")}

  const name = user?.email.split("@")[0]
  const displayName = user?.displayName? user?.displayName : name
  
  return(
    <Container>
        <Heading style={{marginTop: '50%', marginBottom: 15}}>
          <H1 style={{marginBottom: 10, fontSize: 25}}>{locale.custom.Verify.title}</H1>
          <P>{locale.forgot.success.description}</P>
          <H2 style={{marginTop: 30 ,marginBottom: 15}}>{locale.forgot.success.alert_tittle}</H2>
          <P>{locale.forgot.success.alert_msg}</P>
        </Heading>
        <ButtonPrimary onPress={handleEmailVerify} accessibilityLabel={locale.forgot.success.Button.msg}>
          <TxtButton>{locale.forgot.success.Button.text}</TxtButton> 
        </ButtonPrimary>
      </Container>
  )
}
import React, { useState, useContext, useEffect } from 'react'
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserAvatar from 'react-native-user-avatar';
import * as ImagePicker from 'expo-image-picker';

import { AuthContext } from '../../../../api/firebase';

import { LocaleContext } from '../../../../components/locale'
import { 
  BgMark,
  LogoBg,
  LogoName,
  Avoiding,
  Header,
  Body,
  Main,
  Div,
  View,
  ScrollView,
  Input,
  TextInput,
  H1, H2, H3, P,
  TxtButton,
  StatusOnline,
  Button,
  ButtonEmpyte,
  WideButton,
  AbsoluteButton,
  Profile,
  Picture,
  ProfilePicture,
  Infor,
  Provider,
  Footer
} from '../../../../components/styles';

export default function Preferences({ navigation })  {
  const {locale} = useContext(LocaleContext);
  const {user, updateUserPhoto, updateUserName, signOut} = useContext(AuthContext);
  const [error, setError] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [photo, setPhoto] = useState('');
  const [userName, setUserName] = useState('');

  const name = user?.email.split("@")[0]

  const handleBack = async () => {navigation.goBack()}
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
  const handleEditPhotoSelect = async () => {
    Alert.alert(
      'Selecionar Imagem',
      'Escolha uma opção',
      [
        {
          text: 'Abrir Galeria',
          onPress: () => {libraryPicker()},
        },
        {
          text: 'Abrir Câmera',
          onPress: () => {cameraPicker()},
        },
      ],
      { cancelable: true }
    );
  }
  const libraryPicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri)
      const photoURL = result.assets[0].uri
      try {
        await updateUserPhoto(photoURL)
      } catch (error) {
        setError(error.code)
      }
    }
  }
  const cameraPicker = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({

    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri)
      const photoURL = result.assets[0].uri
      try {
        await updateUserPhoto(photoURL)
      } catch (error) {
        setError(error.code)
      }
    }
  }

  const handleEditName = async () => {
    setEditingName(true)
  }
  const nameValidation = async (text) => {
    setUserName(text)
  }
  const handleEditedName = async () => {
    const displayName = userName
    try {
      await updateUserName(displayName)
    } catch (error) {
      setError(error.code)
    }
    setEditingName(false)
  }
  const handleChangeEmail = async () => {}
  const handleChangePassword = async () => {}
  const handleCoutry = async () => {}
  const handlePreferences = async () => {}
  const handleAbout = async () => {navigation.navigate("About")}
  
  useEffect(() => {
    setPhoto(user?.photoURL)
    setUserName(user?.displayName? user?.displayName : name)
  }, [user, setUserName, setPhoto])
  
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Avoiding behavior="height">
        <Body>
          <Header style={{marginTop: "8%"}}>
            <Div style={{marginLeft: 20, alignItems: 'flex-start'}}>
              <ButtonEmpyte
                onPress={handleBack}
                accessibilityLabel="Learn more about this purple button"
              >
                <Ionicons name="arrow-back-outline" size={28} color="#000000" />
              </ButtonEmpyte>
            </Div>
            <Div>
              <H1>{locale.settings.title}</H1>
            </Div>
            <Div style={{marginRight: 20, alignItems: 'flex-end'}}>
              <ButtonEmpyte
                onPress={handleLogout}
                accessibilityLabel="Learn more about this purple button"
              >
                <Ionicons name="log-out-outline" size={28} color="#000000" />
              </ButtonEmpyte>
            </Div>
          </Header>
          <Main>
            <Profile>
              <Picture>
                <ButtonEmpyte
                  onPress={handleEditPhotoSelect}
                  accessibilityLabel="Learn more about this purple button"
                >
                  <ProfilePicture>
                    <UserAvatar size={102} style={{width: 102, height: 102, borderRadius: 100}} name={userName} src={photo}/>
                  </ProfilePicture>
                </ButtonEmpyte>
                <View
                  style={{justifyContent: 'center', alignItems: 'center', width: 19, height: 19, marginTop: -25, marginLeft: 80, backgroundColor: '#00000080',borderRadius: 100}}
                >
                  <Ionicons name="camera" size={12} color="#fff" />
                </View>
              </Picture>
                {editingName ?
                  <Infor>
                    <Input style={{width: '50%', height: 30}}>
                      <TextInput
                        style={{height: 50}}
                        value={userName}
                        selectionColor="#FFBF00"
                        textContentType="name"
                        returnKeyType="done"
                        enterKeyHint="done"
                        autoFocus
                        onChangeText={nameValidation}
                        onSubmitEditing={handleEditedName}
                      />
                      <ButtonEmpyte
                        style={{marginLeft: 5, marginRight: 10}}
                        onPress={handleEditedName}
                        accessibilityLabel="Learn more about this purple button"
                      >
                        <Ionicons name="checkmark" size={19} color="#757575" />
                      </ButtonEmpyte> 
                    </Input>
                  </Infor>
                :
                  <Infor>
                    <H3 style={{marginLeft: 30}}>{userName}</H3>
                    <ButtonEmpyte
                      style={{marginLeft: 10}}
                      onPress={handleEditName}
                      accessibilityLabel="Learn more about this purple button"
                    >
                      <Ionicons name="create-outline" size={19} color="#757575" />
                    </ButtonEmpyte> 
                  </Infor>
                }    
            </Profile>
            <ScrollView style={{marginTop: 30}}>
              <WideButton>
                <View style={{alignItems: 'flex-start'}}>
                  <H3>{locale.settings.config.email_config.title}</H3>
                  <P>{user?.email}</P>
                </View>
                <Ionicons name="chevron-forward" size={30} color="#757575" />
              </WideButton>
              <WideButton>
                <View style={{alignItems: 'flex-start'}}>
                  <H3>{locale.settings.config.password_config.title}</H3>
                </View>
                <Ionicons name="chevron-forward" size={30} color="#757575" />
              </WideButton>
              <WideButton>
                <View style={{alignItems: 'flex-start'}}>
                  <H3>{locale.settings.config.anddress_config.title}</H3>
                  <P>{locale.settings.config.anddress_config.description}</P>
                </View>
                <Ionicons name="chevron-forward" size={30} color="#757575" />
              </WideButton>
              <WideButton>
                <View style={{alignItems: 'flex-start'}}>
                  <H3>{locale.settings.config.preferences_config.title}</H3>
                  <P>{locale.settings.config.preferences_config.description}</P>
                </View>
                <Ionicons name="chevron-forward" size={30} color="#757575" />
              </WideButton>
            </ScrollView>
            <Provider>
              <WideButton style={{marginVertical: 2}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="logo-google" size={26} color="#757575" />
                  <H3 style={{marginLeft: 30}}>Google</H3>
                </View>
                <H3 style={{marginRight: 10}}>Link</H3>
              </WideButton>
              <WideButton style={{marginVertical: 2}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="logo-apple" size={28} color="#757575" />
                  <H3 style={{marginLeft: 30}}>Apple</H3>
                </View>
                <H3 style={{marginRight: 10}}>Link</H3>
              </WideButton>
            </Provider>
          </Main>
          <Footer>
            <ButtonEmpyte 
              style={{color: '#fff', marginTop: 15}}
              onPress={handleAbout}
            >
              <P>About</P>
              <H2>{locale.global.app.name}</H2>
            </ButtonEmpyte>
          </Footer>
        </Body>
      </Avoiding>
    </TouchableWithoutFeedback>
  )
}
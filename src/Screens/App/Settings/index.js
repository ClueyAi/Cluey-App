import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserAvatar from 'react-native-user-avatar';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';

import { UserContext } from '../../../api/firebase';

import { LocaleContext } from '../../../components/locale';
import { 
  Container,
  Body,
  Main,
  View,
  ScrollView,
  Input,
  TextInput,
  H1, H3, P,
  ButtonEmpyte,
  WideButton,
  Profile,
  Picture,
  ProfilePicture,
  PictureEdit,
  Infor,
  Provider,
  Footer
} from '../../../components/styles';

export default function Settings({ navigation })  {
  const {locale} = useContext(LocaleContext);
  const {user, updateUserPhoto, updateUserName} = useContext(UserContext);
  const [error, setError] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [photo, setPhoto] = useState('');
  const [userName, setUserName] = useState('');

  const handleEditPhoto = async () => {
    Alert.alert(
      locale.alert.photo_change.title,
      locale.alert.photo_change.message,
      [
        {
          text: "cancel",
          style: 'cancel',
        },
        {
          text: locale.alert.photo_change.camera,
          onPress: () => {cameraPicker()},
        },
        {
          text: locale.alert.photo_change.library,
          onPress: () => {libraryPicker()},
        },
      ],
      { cancelable: true }
    );
  };
  const libraryPicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert(locale.settings.photo_button.library_permission);
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri
      const photoName = user?.uid     
      try {
        await updateUserPhoto(uri, photoName)
      } catch (error) {
        setError(error.code)
      }
    }
    setPhoto(user?.photoURL? user?.photoURL : result.assets[0].uri)
  };
  const cameraPicker = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert(locale.settings.photo_button.camera_permission);
      return;
    }
    let result = await ImagePicker.launchCameraAsync({

    });
    if (!result.canceled) {
      const uri = result.assets[0].uri
      const photoName = user?.uid     
      try {
        await updateUserPhoto(uri, photoName)
      } catch (error) {
        setError(error.code)
      }
    }
    setPhoto(user?.photoURL? user?.photoURL : result.assets[0].uri)
  };

  const handleEditNameOn = async () => {
    setEditingName(true)
  };
  const handleEditNameOf = async () => {
    setEditingName(false)
    Keyboard.dismiss()
  };
  const nameValidation = async (text) => {
    setUserName(text)
  };
  const handleEditName = async () => {
    const displayName = userName
    try {
      await updateUserName(displayName)
    } catch (error) {
      setError(error.code)
    }
    setEditingName(false)
  };
  const handleChangeEmail = async () => {navigation.navigate('ChangeEmail')};
  const handleChangePassword = async () => {navigation.navigate('ChangePassword')};
  const handleCountry = async () => {navigation.navigate('Country')};
  const handlePreferences = async () => {navigation.navigate('Preferences')};
  const handleAbout = async () => {navigation.navigate('About')};
    
  useEffect(() => {
    const name = user?.email.split("@")[0]
    setPhoto(user?.photoURL);
    setUserName(user?.displayName? user?.displayName : name);
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      setEditingName(false);
    }, [])
  );
  
  return(
    <TouchableWithoutFeedback onPress={handleEditNameOf} accessible={false}>
      <Container>
        <Body>
          <Main>
            <Profile>
              <Picture>
                <ButtonEmpyte onPress={handleEditPhoto} accessibilityLabel={locale.settings.photo_button.msg}>
                  <ProfilePicture>
                    <UserAvatar size={102} style={{width: 102, height: 102, borderRadius: 100}} name={userName} src={photo}/>
                  </ProfilePicture>
                </ButtonEmpyte>
                <PictureEdit>
                  <Ionicons name="camera" size={14} color="#000" />
                </PictureEdit>
              </Picture>
              {editingName ?
                <Infor>
                  <Input style={{width: '50%', height: 30}}>
                    <TextInput
                      style={{height: 50}}
                      value={userName}
                      selectionColor="#FFBF00"
                      autoComplete="name"
                      autoCapitalize="words"
                      returnKeyType="done"
                      enterKeyHint="done"
                      autoFocus
                      onChangeText={nameValidation}
                      onSubmitEditing={handleEditName}
                      />
                    <ButtonEmpyte style={{marginLeft: 5, marginRight: 10}} onPress={handleEditNameOf} accessibilityLabel={locale.settings.name_button.msg}>
                      <Ionicons name="close" size={19} color="#FF0000A0" />
                    </ButtonEmpyte> 
                  </Input>
                </Infor>
              :
                <Infor>
                  <ButtonEmpyte style={{marginLeft: 30,flexDirection: 'row', alignItems: 'center'}} onPress={handleEditNameOn} accessibilityLabel={locale.settings.name_button.msg}>
                    <H3 style={{marginRight: 10}}>{userName}</H3>
                    <Ionicons name="create-outline" size={19} color="#757575" />
                  </ButtonEmpyte> 
                </Infor>
              }    
            </Profile>
            <ScrollView style={{marginTop: 30}}>
              <WideButton onPress={handleChangeEmail}>
                <View style={{alignItems: 'flex-start'}}>
                  <H3>{locale.settings.config.email_config.title}</H3>
                  <P>{user?.email}</P>
                </View>
                <Ionicons name="chevron-forward" size={30} color="#757575" />
              </WideButton>
              <WideButton onPress={handleChangePassword}>
                <View style={{alignItems: 'flex-start'}}>
                  <H3>{locale.settings.config.password_config.title}</H3>
                </View>
                <Ionicons name="chevron-forward" size={30} color="#757575" />
              </WideButton>
              <WideButton onPress={handleCountry}>
                <View style={{alignItems: 'flex-start'}}>
                  <H3>{locale.settings.config.anddress_config.title}</H3>
                  <P>{locale.settings.config.anddress_config.description}</P>
                </View>
                <Ionicons name="chevron-forward" size={30} color="#757575" />
              </WideButton>
              <WideButton onPress={handlePreferences}>
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
              <H1>{locale.global.app.name}</H1>
            </ButtonEmpyte>
          </Footer>
        </Body>
      </Container>
    </TouchableWithoutFeedback>
  );
};
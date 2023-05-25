import React, { useState, useContext, useEffect, useCallback } from "react";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserAvatar from "react-native-user-avatar";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import PropTypes from "prop-types";

import { UserContext, FirestoreContext } from "../../../api/firebase";
import { ThemeContext } from "../../../components/theme";
import { LocaleContext } from "../../../components/locale";
import {
  Container,
  Body,
  Main,
  View,
  ScrollView,
  Input,
  TextInput,
  H1,
  H3,
  P,
  ButtonEmpyte,
  WideButton,
  Profile,
  Picture,
  ProfilePicture,
  PictureEdit,
  Infor,
  Footer,
} from "../../../components/styles";

const Settings = ({ navigation }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const { updateUserName } = useContext(UserContext);
  const { user, updateUserPhoto } = useContext(FirestoreContext);
  const [editingName, setEditingName] = useState(false);
  const [userName, setUserName] = useState("");

  const handleEditPhoto = async () => {
    Alert.alert(
      locale.alert.photo_change.title,
      locale.alert.photo_change.message,
      [
        {
          text: "cancel",
          style: "cancel",
        },
        {
          text: locale.alert.photo_change.camera,
          onPress: () => {
            pickImage("camera");
          },
        },
        {
          text: locale.alert.photo_change.library,
          onPress: () => {
            pickImage("library");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const pickImage = async (sourceType) => {
    let result;
    if (sourceType === "camera") {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        alert(locale.settings.photo_button.camera_permission);
        return;
      }
      result = await ImagePicker.launchCameraAsync({});
    } else if (sourceType === "library") {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert(locale.settings.photo_button.library_permission);
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
    }
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      try {
        await updateUserPhoto(uri);
      } catch (error) {
        console.log(error.code);
      }
    }
  };

  const handleEditNameOn = () => {
    setEditingName(true);
  };
  const handleEditNameOf = () => {
    setEditingName(false);
    Keyboard.dismiss();
  };
  const nameValidation = (text) => {
    setUserName(text);
  };
  const handleEditName = async () => {
    const displayName = userName;
    try {
      await updateUserName(displayName);
    } catch (error) {
      console.log(error.code);
    }
    setEditingName(false);
  };
  const handleAccount = () => {
    navigation.navigate("Account");
  };
  const handlePreferences = () => {
    navigation.navigate("Preferences");
  };
  const handleAbout = () => {
    navigation.navigate("About");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const name = user?.profile.email.split("@")[0];
      setUserName(user?.profile.displayName ? user?.profile.displayName : name);
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      setEditingName(false);
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={handleEditNameOf} accessible={false}>
      <Container>
        <Body>
          <Main style={{marginTop: 20}}>
            <Profile>
              <Picture>
                <ButtonEmpyte
                  onPress={handleEditPhoto}
                  accessibilityLabel={locale.settings.photo_button.accessibility}
                >
                  <ProfilePicture>
                    <UserAvatar
                      size={102}
                      style={{ width: 102, height: 102, borderRadius: 100 }}
                      name={user?.profile.displayName}
                      src={user?.profile.photoURL? user?.profile.photoURL : null}
                    />
                  </ProfilePicture>
                </ButtonEmpyte>
                <PictureEdit>
                  <Ionicons name="camera" size={14} color={theme.text} />
                </PictureEdit>
              </Picture>
              {editingName ? (
                <Infor style={{marginTop: 10}}>
                  <Input style={{ width: "50%", height: 30 }}>
                    <TextInput
                      style={{ height: 50 }}
                      value={userName}
                      selectionColor={theme.primary}
                      autoComplete="name"
                      autoCapitalize="words"
                      returnKeyType="done"
                      enterKeyHint="done"
                      autoFocus
                      onChangeText={nameValidation}
                      onSubmitEditing={handleEditName}
                    />
                    <ButtonEmpyte
                      style={{ marginLeft: 5, marginRight: 10 }}
                      onPress={handleEditNameOf}
                      accessibilityLabel={locale.settings.name_button.accessibility}
                    >
                      <Ionicons name="close" size={19} color={theme.error} />
                    </ButtonEmpyte>
                  </Input>
                </Infor>
              ) : (
                <Infor style={{marginTop: 10}}>
                  <ButtonEmpyte
                    style={{
                      marginLeft: 30,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={handleEditNameOn}
                    accessibilityLabel={locale.settings.name_button.accessibility}
                  >
                    <H3 style={{ marginRight: 10 }}>{userName}</H3>
                    <Ionicons name="create-outline" size={19} color={theme.textGray} />
                  </ButtonEmpyte>
                </Infor>
              )}
            </Profile>
            <ScrollView style={{ marginTop: 30 }}>
              <WideButton onPress={handleAccount}>
                <View style={{ alignItems: "flex-start" }}>
                  <H3>{locale.account.title}</H3>
                  <P>{locale.account.description}</P>
                </View>
                <Ionicons name="chevron-forward" size={30} color={theme.textGray} />
              </WideButton>
              <WideButton onPress={handlePreferences}>
                <View style={{ alignItems: "flex-start" }}>
                  <H3>{locale.preferences.title}</H3>
                  <P>{locale.preferences.description}</P>
                </View>
                <Ionicons name="chevron-forward" size={30} color={theme.textGray} />
              </WideButton>
            </ScrollView>
            {/*
            <Provider>
              <WideButton style={{marginVertical: 2}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="logo-google" size={26} color={theme.textGray} />
                  <H3 style={{marginLeft: 30}}>Google</H3>
                </View>
                <H3 style={{marginRight: 10}}>Link</H3>
              </WideButton>
              <WideButton style={{marginVertical: 2}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="logo-apple" size={28} color={theme.textGray} />
                  <H3 style={{marginLeft: 30}}>Apple</H3>
                </View>
                <H3 style={{marginRight: 10}}>Link</H3>
              </WideButton>
            </Provider>
            */}
          </Main>
          <Footer>
            <ButtonEmpyte
              style={{ color: theme.background, marginTop: 15 }}
              onPress={handleAbout}
            >
              <P>{locale.about.title}</P>
              <H1>{locale.global.app.name}</H1>
            </ButtonEmpyte>
          </Footer>
        </Body>
      </Container>
    </TouchableWithoutFeedback>
  );
};

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Settings;

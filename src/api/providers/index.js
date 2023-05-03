import React, { createContext, useState } from 'react';
import * as AuthSession from "expo-auth-session";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from "prop-types";

export const ProvidersContext = createContext();

export const ProvidersProvider = ({ children }) => {
  const notNew = async () => {AsyncStorage.setItem('isNewUser', 'false')};
  const [userInfo, setUserInfo] = useState(null);
  const GOOGLE_ID = Constants.manifest.extra.google.webClientId;
  const REDIRECT_URI = Constants.manifest.extra.google.redirectUri;
  const RESPONSE_TYPE = "token";
  const SCOPE = encodeURI("profile email");
  
  const signInWithGoogle = async () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    const { type, params } = await AuthSession.startAsync({ authUrl });
    if (type === "success") {
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
      const userInfo = await response.json();
      const { email, name, picture } = userInfo;
      const user = {
        email,
        name,
        picture,
      };
      console.log(`Olá, ${user.name}!\nSeu email é ${user.email}.\nSua foto de perfil é ${user.picture}.`);
    }
  };

  const value = {
    userInfo,
    signInWithGoogle
  };

  return <ProvidersContext.Provider value={value}>{children}</ProvidersContext.Provider>;
};

ProvidersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
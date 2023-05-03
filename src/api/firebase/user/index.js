import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";

import { auth, storage, emailProvider } from '../config';
import { LocaleContext } from '../../../components/locale';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const {locale} = useContext(LocaleContext);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      user?setIsAuth(true):setIsAuth(false);
      auth.languageCode = locale.global.language.iso;
    });

    return () =>  unsubscribe
  }, [auth, locale]);

  const updateUserPhoto = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = storage.ref().child(`${user?.uid}/photoURL.jpg`);
    const snapshot = await ref.put(blob);

    const photoURL = await snapshot.ref.getDownloadURL();

    return await auth.currentUser.updateProfile({
      photoURL: photoURL
    });
  };

  const updateUserName = async (displayName) => {
    return await auth.currentUser.updateProfile({
      displayName: displayName
    });
  };

  const updateUserEmail = async (password, newEmail) => {
    const credential = emailProvider.credential(
      user.email,
      password
    );
    await auth.currentUser.reauthenticateWithCredential(credential);
    await auth.currentUser.updateEmail(newEmail);
    await auth.currentUser.sendEmailVerification();
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    const credential = emailProvider.credential(
      user.email,
      currentPassword
    );
    await user.reauthenticateWithCredential(credential);
    await user.updatePassword(newPassword);
  };
  
  const value = {
    user,
    isAuth,
    updateUserPhoto,
    updateUserName,
    updateUserEmail,
    updateUserPassword
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};
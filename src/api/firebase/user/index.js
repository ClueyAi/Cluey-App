import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, storage, EmailAuthProvider } from '../config';
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
  }, []);

  const updateUser = async (email, phoneNumber, emailVerified, password, displayName, photoURL, disabled) => {
    return await auth.currentUser.updateProfile({
      email: email,
      phoneNumber: phoneNumber,
      emailVerified: emailVerified,
      password: password,
      displayName: displayName,
      photoURL: photoURL,
      disabled: disabled,
    });
  };

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
    const credential = EmailAuthProvider.credential(
      user.email,
      password
    );
    await auth.currentUser.reauthenticateWithCredential(credential);
    await auth.currentUser.updateEmail(newEmail);
    await auth.currentUser.sendEmailVerification();
  };
  
  const value = {
    user,
    isAuth,
    updateUser,
    updateUserPhoto,
    updateUserName,
    updateUserEmail
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
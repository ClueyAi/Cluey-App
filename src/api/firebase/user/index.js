import React, { createContext, useState, useEffect } from 'react';
import { auth, storage } from '../config';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      user?setIsAuth(true):setIsAuth(false);
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

  const updateUserPhoto = async (uri, photoName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = storage.ref().child(`usersPhoto/${photoName}.jpg`);
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

  const updateUserEmail = async (currentEmail, password, newEmail) => {
    const credential = auth.EmailAuthProvider.credential(
      currentEmail,
      password
    );
    await auth.currentUser.reauthenticateWithCredential(credential);
    await auth.currentUser.updateEmail(newEmail);
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
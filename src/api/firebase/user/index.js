import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";

import { auth, emailProvider } from '../config';
import { LocaleContext } from '../../../components/locale';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const {locale} = useContext(LocaleContext);
  const [authUser, setAuthUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setAuthUser(user);
      user?setIsAuth(true):setIsAuth(false);
      user?.emailVerified?setIsVerify(true):setIsVerify(false);
    });

    return () =>  unsubscribe
  }, [auth]);

  

  const updateUserName = async (displayName) => {
    return await auth.currentUser.updateProfile({
      displayName: displayName
    });
  };

  const updateUserEmail = async (password, newEmail) => {
    const credential = emailProvider.credential(
      authUser.email,
      password
    );
    await auth.currentUser.reauthenticateWithCredential(credential);
    await auth.currentUser.updateEmail(newEmail);
    await auth.currentUser.sendEmailVerification({
      locale: locale.language.locale
    });
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    const credential = emailProvider.credential(
      authUser.email,
      currentPassword
    );
    await authUser.reauthenticateWithCredential(credential);
    await authUser.updatePassword(newPassword);
  };
  
  const value = {
    authUser,
    isAuth,
    isVerify,
    updateUserName,
    updateUserEmail,
    updateUserPassword
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};
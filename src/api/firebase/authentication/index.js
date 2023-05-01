import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from "prop-types";

import { auth, googleProvider, facebookProvider, githubProvider } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isNew, setIsNew] = useState(true);
  const notNew = async () => {AsyncStorage.setItem('isNewUser', 'false')};

  useEffect(() => {
    const unsubscribe = AsyncStorage.getItem('isNewUser').then((value) => {
      if (value === 'false') {
        setIsNew(false);
      } else {
        setIsNew(true);
      }
    });

    return () =>  unsubscribe
  }, []);

  const signGoogle = async () => {
    return await auth.signInWithPopup(googleProvider).then(() => {
      notNew();
    });
  };

  const signFacebook = async () => {
    return await auth.signInWithPopup(facebookProvider).then(() => {
      notNew();
    });
  };

  const signGithub = async () => {
    return await auth.signInWithPopup(githubProvider).then(() => {
      notNew();
    });
  };

  const signIn = async (email, password) => {
    return await auth.signInWithEmailAndPassword(email, password).then(() => {
      notNew();
    });
  };

  const signUp = async (email, password) => {
    return await auth.createUserWithEmailAndPassword(email, password).then(() => {
      notNew();
    });
  };

  const emailVerify = async () => {
    return await auth.currentUser.sendEmailVerification();
  };

  const forgot = async (email) => {
    return await auth.sendPasswordResetEmail(email);
  };

  const signOut = async () => {
    return auth.signOut();
  };

  const value = {
    isNew,
    signGoogle,
    signFacebook,
    signGithub,
    signIn,
    signUp,
    emailVerify,
    forgot,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
import React, { createContext } from 'react';
import { auth } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const signIn = async (email, password) => {
    return await auth.signInWithEmailAndPassword(email, password);
  };

  const signUp = async (email, password) => {
    return await auth.createUserWithEmailAndPassword(email, password);
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
    signIn,
    signUp,
    emailVerify,
    forgot,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
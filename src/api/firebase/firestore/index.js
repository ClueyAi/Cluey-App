import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";

import { firestore } from '../config';
import { UserContext } from '../user';
export const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const {user, isAuth} = useContext(UserContext);
  const [messages, setMessages] = useState(null);
  const [hasMessages, setHasMessages] = useState(false);
  const [profile, setProfile] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);

  const currentUser = user?.uid;

  useEffect(() => {
    if (isAuth) {
      const getMessage = firestore.collection('chat-'+currentUser)
        .orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(data);
          data.length === 0?setHasMessages(false):setHasMessages(true)
      });

      const getProfile = firestore.collection('profile').doc(currentUser)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setProfile(data);
          setHasProfile(true);
        } else {
          setHasProfile(false);
        }
      });

      return () => {
        getMessage();
        getProfile();
      }
    }
  }, [isAuth]);

  const createAiMessage = async (message) => {
    return await firestore.collection('chat-'+currentUser).add(message);
  };

  const createBotMessage = async (message) => {
    return await firestore.collection('chat-'+currentUser).add(message);
  };

  const updateProfile = async (profile) => {
    const docRef = firestore.collection('profile').doc(currentUser);
    const doc = await docRef.get();
    if (doc.exists) {
      return await docRef.update(profile);
    } else {
      return await docRef.set(profile);
    }
  };

  const value = {
    messages,
    profile,
    hasMessages,
    hasProfile,
    createAiMessage,
    createBotMessage,
    updateProfile
  };

  return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
};

FirestoreProvider.propTypes = {
  children: PropTypes.node.isRequired
};
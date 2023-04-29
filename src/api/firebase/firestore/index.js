import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";

import { firestore } from '../config';
import { UserContext } from '../user';
export const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const {user, isAuth} = useContext(UserContext);
  const [messages, setMessages] = useState(null);
  const [isData, setIsData] = useState(false);
  const [hasData, setHasData] = useState(null);

  const currentUser = user?.uid;

  useEffect(() => {
    if (isAuth) {
      const unsubscribe = firestore.collection('ai-'+currentUser)
        .orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(data);
          data?setIsData(true):setIsData(false);
          data.length === 0?setHasData(false):setHasData(true)
        });

      return () => unsubscribe();
    }
  }, [isAuth, hasData, isData]);

  const createAiMessage = async (message) => {
    return await firestore.collection('ai-'+currentUser).add(message);
  };

  const createBotMessage = async (message) => {
    return await firestore.collection('Ai-'+currentUser).add(message);
  };

  const value = {
    messages,
    isData,
    hasData,
    createAiMessage,
    createBotMessage
  };

  return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
};

FirestoreProvider.propTypes = {
  children: PropTypes.node.isRequired
};
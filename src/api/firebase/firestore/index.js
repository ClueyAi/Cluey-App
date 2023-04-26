import React, { createContext, useState, useEffect, useContext } from 'react';
import { firestore } from '../config';

import { UserContext } from '../user';
export const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const [messages, setMessages] = useState(null);
  const [isData, setIsData] = useState(false);
  const [hasData, setHasData] = useState(null);
  const { isAuth } = useContext(UserContext);

  useEffect(() => {
    if (isAuth) {
      const unsubscribe = firestore.collection('public')
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

  const createMessage = async (message) => {
    return await firestore.collection('public').add(message);
  };

  const value = {
    messages,
    isData,
    hasData,
    createMessage,
  };

  return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
};
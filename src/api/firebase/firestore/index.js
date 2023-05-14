import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";

import { firestore, arrayUnion } from '../config';
import { sendMessageToOpenAI } from '../../openai';
import { UserContext } from '../user';
export const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const {authUser, isAuth} = useContext(UserContext);
  const [app, setApp] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [hasAllUsers, setHasAllUsers] = useState(false);
  const [user, setUser] = useState(null);
  const [hasUser, setHasUser] = useState(false);
  const [chats, setChats] = useState(null);
  const [hasChats, setHasChats] = useState(false);
  const [friendChats, setFriendChats] = useState(null);
  const [hasFriendChats, setHasFriendChats] = useState(false);

  useEffect(() => {
    if (isAuth) {
      const getApp = firestore.collection('app').doc('info')
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setApp(data);
        }
      });

      const getAllUsers = firestore.collection('users')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllUsers(data);
        data.length === 0?setHasAllUsers(false):setHasAllUsers(true);
      });

      const getUser = firestore.collection('users').doc(authUser?.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setUser(data);
          setHasUser(true);
        } else {
          setHasUser(false);
        }
      });

      const getChats = firestore.collection('users').doc(authUser?.uid).collection('cluey')
      .orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setChats(data);
          data.length === 0?setHasChats(false):setHasChats(true)
      });

      const getFriendChats = firestore.collection('users').doc(authUser?.uid).collection('friends')
      .orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFriendChats(data);
          data.length === 0?setHasFriendChats(false):setHasFriendChats(true)
      });



      return () => {
        getApp();
        getAllUsers();
        getUser();
        getChats();
        getFriendChats();
      }
    }
  }, [authUser, isAuth]);

  const putUser = async () => {
    const timestamp = Date().toLocaleString();
    const name = authUser?.email.split("@")[0];

    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.set({
      uid: authUser?.uid,
      createdAt: timestamp,
      updatedAt: timestamp,
      profile: {
        displayName: authUser.displayName?authUser.displayName: name,
        email: authUser.email,
        emailVerified: authUser.emailVerified,
        photoURL: authUser.photoURL? authUser.photoURL: '',
      },
    }, { merge: true })
  };

  const putPreferences = async (focusItens, interestsItens) => {
    const timestamp = Date().toLocaleString();

    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.set({
      preferences: {
        focus: focusItens,
        interests: interestsItens,
      },
      updatedAt: timestamp,
    }, { merge: true })
  };

  const getContacts = async (contacts) => {
    const querySnapshot = await firestore.collection('users')
      .where('profile.email', 'in', contacts)
      .get();
  
    const contactsData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { ...data, id: doc.id };
    });
  
    return contactsData;
  };

  const putContact = async (contact) => {
    const timestamp = Date().toLocaleString();

    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.update({
      contacts: arrayUnion(contact),
      updatedAt: timestamp,
    })
  };

  const putCountry = async (iso, name) => {
    const timestamp = Date().toLocaleString();

    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.set({
      country: {
        iso: iso,
        name: name,
      },
      updatedAt: timestamp,
    }, { merge: true })
  };

  const createChat = async (text) => {
    const timestamp = Date().toLocaleString();
    const name = text.substring(0, 30);
    const chat = {
      name: name,
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: [],
    };
    return await firestore.collection('users').doc(authUser?.uid).collection('cluey').add(chat);
  };

  const createUserMessage = async (chatId, text) => {
    const timestamp = Date().toLocaleString();
    const chat = {
      updatedAt: timestamp,
    };
    const message = {
      idUser: authUser?.uid,
      createdAt: timestamp,
      text: text,
    };
    await firestore.collection('users').doc(authUser?.uid).collection('cluey').doc(chatId).set(chat, { merge: true })
      .then(() => {
        firestore.collection('users').doc(authUser?.uid).collection('cluey').doc(chatId)
        .update({
          messages: arrayUnion(message),
        });
      }
    );
  };

  const createAiMessage = async (chatId, text) => {
    const response = await sendMessageToOpenAI(text);
    const timestamp = Date().toLocaleString();
    const chat = {
      updatedAt: timestamp,
    };
    const message = {
      name: 'Cluey',
      createdAt: timestamp,
      text: response,
    };
    await firestore.collection('users').doc(authUser?.uid).collection('cluey').doc(chatId).set(chat, { merge: true })
      .then(() => {
        firestore.collection('users').doc(authUser?.uid).collection('cluey').doc(chatId)
        .update({
          messages: arrayUnion(message),
        });
      }
    );
  };

  const editChat = async (chatId, newName) => {
    const timestamp = Date().toLocaleString();
    const docRef = firestore.collection('users').doc(authUser?.uid).collection('cluey').doc(chatId);
    if (chatId === 'default') {
      return;
    } else {
      return await docRef.update({name: newName, updatedAt: timestamp});
    }
  };

  const deleteChat = async (chatId) => {
    const docRef = firestore.collection('users').doc(authUser?.uid).collection('cluey').doc(chatId);
    if (chatId === 'default') {
      return;
    } else {
      return await docRef.delete();
    }
  };

  const createFriendChat = async (email) => {
    const timestamp = Date().toLocaleString();
    const chat = {
      email: email,
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: [],
    };
    const chatRef = firestore.collection('users').doc(authUser?.uid).collection('friends').doc(email);
    const doc = await chatRef.get();
    if (!doc.exists) {
      return await chatRef.set(chat);
    }
  };

  const createUserFriendMessage = async (email, text) => {
    const timestamp = Date().toLocaleString();
    const chat = {
      updatedAt: timestamp,
    };
    const message = {
      idUser: authUser?.uid,
      createdAt: timestamp,
      text: text,
    };
    await firestore.collection('users').doc(authUser?.uid).collection('friends').doc(email).set(chat, { merge: true })
      .then(() => {
        firestore.collection('users').doc(authUser?.uid).collection('friends').doc(email)
        .update({
          messages: arrayUnion(message),
        });
      }
    );
  };
  

  const value = {
    app,
    allUsers,
    hasAllUsers,
    user,
    hasUser,
    chats,
    hasChats,
    friendChats,
    hasFriendChats,
    putUser,
    putPreferences,
    getContacts,
    putContact,
    putCountry,
    createChat,
    createUserMessage,
    createAiMessage,
    editChat,
    deleteChat,
    createFriendChat,
    createUserFriendMessage,

  };

  return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
};

FirestoreProvider.propTypes = {
  children: PropTypes.node.isRequired
};
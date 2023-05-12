import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";

import { firestore } from '../config';
import { UserContext } from '../user';
export const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const {user, isAuth} = useContext(UserContext);
  const [allUsers, setAllUsers] = useState(null);
  const [hasAllUsers, setHasAllUsers] = useState(false);
  const [thisUser, setThisUser] = useState(null);
  const [hasThisUser, setHasThisUser] = useState(false);
  const [contacts, setContacts] = useState(null);
  const [hasContacts, setHasContacts] = useState(false);
  const [messages, setMessages] = useState(null);
  const [hasMessages, setHasMessages] = useState(false);
  const [chats, setChats] = useState(null);
  const [hasChats, setHasChats] = useState(false);
  const [profile, setProfile] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);

  const currentUser = user?.uid;

  useEffect(() => {
    if (isAuth) {
      const getAllUsers = firestore.collection('users')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllUsers(data);
        data.length === 0?setHasAllUsers(false):setHasAllUsers(true);
      });

      const getThisUsers = firestore.collection('users').doc(currentUser)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setThisUser(data);
          setHasThisUser(true);
        } else {
          setHasThisUser(false);
        }
      });

      const getContacts = firestore.collection('users').doc(currentUser).collection('contacts')
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContacts(data);
          data.length === 0?setHasContacts(false):setHasContacts(true);
      });

      const getChats = firestore.collection('users').doc(currentUser).collection('cluey')
      .orderBy('createdAt', 'asc').onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setChats(data);
          data.length === 0?setHasChats(false):setHasChats(true)
      });

      const getClueyMessages = firestore.collection('users').doc(currentUser)
      .collection('cluey').doc('default').collection('messages').orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(data);
          data.length === 0?setHasMessages(false):setHasMessages(true)
      });

      const getProfile = firestore.collection('users').doc(currentUser)
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
        getAllUsers();
        getThisUsers();
        getContacts();
        getClueyMessages();
        getChats();
        getProfile();
      }
    }
  }, [currentUser, isAuth]);

  const putUser = async () => {
    const timestamp = Date().toLocaleString();
    const name = user?.email.split("@")[0];
    const authUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName?user.displayName: name,
      photoURL: user.photoURL? user.photoURL: '',
      emailVerified: user.emailVerified,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    const docRef = firestore.collection('users').doc(currentUser);
    const doc = await docRef.get();
     
    if (doc.exists) {
      return await docRef.update(authUser);
    } else {
      return await docRef.set(authUser);
    }
  };

  const putContact = async (contact) => {
    const docRef = firestore.collection('users').doc(currentUser).collection('contacts').doc(contact);
    const doc = await docRef.get();
    if (!doc.exists) {
      await docRef.set({});
    }
  };

  const updateProfile = async (profile) => {
    const docRef = firestore.collection('users').doc(currentUser);
    const doc = await docRef.get();
    if (doc.exists) {
      return await docRef.update(profile);
    } else {
      return await docRef.set(profile);
    }
  };

  const createChat = async (chat) => {
    await firestore.collection('users').doc(currentUser).collection('cluey').add(chat);
  };

  const createUserMessage = async (message) => {
    const context = {
      name: message.contextName,
      createdAt: message.createdAt,
      text: message.text,
    };
    const docRef = firestore.collection('users').doc(currentUser).collection('cluey').doc('default');
    const doc = await docRef.get();
    if (!doc.exists) {
      await docRef.set(context);
    }
    const userMessage = {
      idUser: currentUser,
      createdAt: message.createdAt,
      text: message.text,
    };
    const messageCollection = firestore.collection('users').doc(currentUser).collection('cluey').doc('default').collection('messages');
    return await messageCollection.add(userMessage);
  };

  const createAiMessage = async (message) => {
    const context = {
      name: message.contextName,
      createdAt: message.createdAt,
      text: message.text,
    };
    const docRef = firestore.collection('users').doc(currentUser).collection('cluey').doc('default');
    const doc = await docRef.get();
    if (!doc.exists) {
      await docRef.set(context);
    } 
    const aiMessage = {
      name: message.responseName,
      createdAt: message.createdAt,
      text: message.text,
    };
    const messageCollection = firestore.collection('users').doc(currentUser).collection('cluey').doc('default').collection('messages');
    return await messageCollection.add(aiMessage);
  };

  const editChat = async (chatId, newName) => {
    const docRef = firestore.collection('users').doc(currentUser).collection('cluey').doc(chatId);
    if (chatId === 'default') {
      return;
    } else {
      return await docRef.update({name: newName});
    }
  };

  const deleteChat = async (chatId) => {
    const docRef = firestore.collection('users').doc(currentUser).collection('cluey').doc(chatId);
    if (chatId === 'default') {
      return;
    } else {
      return await docRef.delete();
    }
  };

  const value = {
    allUsers,
    hasAllUsers,
    thisUser,
    hasThisUser,
    contacts,
    hasContacts,
    messages,
    hasMessages,
    chats,
    hasChats,
    profile,
    hasProfile,
    putUser,
    putContact,
    updateProfile,
    createChat,
    createUserMessage,
    createAiMessage,
    editChat,
    deleteChat
  };

  return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
};

FirestoreProvider.propTypes = {
  children: PropTypes.node.isRequired
};
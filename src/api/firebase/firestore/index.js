import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";

import { firestore, arrayUnion } from '../config';
import { sendMessageToOpenAI } from '../../openai';
import { UserContext } from '../user';
export const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const {authUser, isAuth} = useContext(UserContext);
  const [app, setApp] = useState(null);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [talks, setTalks] = useState(null);

  

  useEffect(() => {
    if (isAuth) {
      const getApp = firestore.collection('app').doc('info')
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setApp(data);
        }
      });

      const getUser = firestore.collection('users').doc(authUser?.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setUser(data);
        } 
      });
       
      const getChats = firestore.collection('users').doc(authUser?.uid).collection('cluey')
      .orderBy('updatedAt', 'desc').onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setChats(data);
      });

      const getContacts = async () => {
        const querySnapshot = await firestore.collection('users')
          .where('profile.email', 'in', user?.contacts)
          .get();
      
        const contactsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });
      
         setContacts(contactsData);
      };
    
      const getTalks = async () => {
        const talksCollection = await firestore.collection('talks')
          .where('emailFriend', 'in', user?.contacts)
          .get();
      
        const talks = talksCollection.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });
    
        const usersCollection = await firestore.collection('users')
          .where('profile.email', 'in', user?.contacts)
          .get();
      
        const users = usersCollection.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });
    
        const combinedData = talks.map((talk) => {
          const userData = users.find((user) => user.profile.email === talk.emailFriend);
          return { talk, userData };
        });
      
        setTalks(combinedData);
      };

      return () => {
        getContacts();
        getApp();
        getUser();
        getChats();
        getTalks();
      }
    }
  }, [authUser, isAuth, user, contacts]);

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
    return await docRef.update({name: newName, updatedAt: timestamp});
  };

  const deleteChat = async (chatId) => {
    const docRef = firestore.collection('users').doc(authUser?.uid).collection('cluey').doc(chatId);
    return await docRef.delete();
  };

  const createTalk = async (email) => {
    const timestamp = Date().toLocaleString();
    const chat = {
      emailUser: authUser?.email,
      emailFriend: email,
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: [],
    };
    const chatRef = firestore.collection('talks')
    const talk = await chatRef
      .where('emailFriend', '==', email)
      .where('emailUser', '==', authUser?.email)
      .get();
    if (talk.docs.length === 0) {
      const newTalkRef = await chatRef.add(chat);
      return newTalkRef.id;
    } else {
      return talk.docs[0].id;
    }
  };
  

  const createUserFriendMessage = async (chatId, text) => {
    const timestamp = Date().toLocaleString();
    const chat = {
      updatedAt: timestamp,
    };
    const message = {
      idUser: authUser?.uid,
      createdAt: timestamp,
      text: text,
    };
    await firestore.collection('talks').doc(chatId).set(chat, { merge: true })
      .then(() => {
        firestore.collection('talks').doc(chatId)
        .update({
          messages: arrayUnion(message),
        });
      }
    );
  };
  

  const value = {
    app,
    user,
    contacts,
    chats,
    talks,
    putUser,
    putPreferences,
    putContact,
    putCountry,
    createChat,
    createUserMessage,
    createAiMessage,
    editChat,
    deleteChat,
    createTalk,
    createUserFriendMessage,

  };

  return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
};

FirestoreProvider.propTypes = {
  children: PropTypes.node.isRequired
};
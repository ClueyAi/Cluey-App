import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {initializeAuth} from 'firebase/auth';
import {getReactNativePersistence} from 'firebase/auth/react-native';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.firebase.apiKey,
  authDomain: Constants.manifest.extra.firebase.authDomain,
  projectId: Constants.manifest.extra.firebase.projectId,
  storageBucket: Constants.manifest.extra.firebase.storageBucket,
  messagingSenderId: Constants.manifest.extra.firebase.messagingSenderId,
  appId: Constants.manifest.extra.firebase.appId,
  measurementId: Constants.manifest.extra.firebase.measurementId
};

const fireApp = firebase.initializeApp(firebaseConfig);

initializeAuth(fireApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
export const storage = firebase.storage();
export const emailProvider = new firebase.auth.EmailAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
import React from 'react';
import PropTypes from "prop-types";

import { AuthProvider, AuthContext } from './authentication';
import { UserProvider, UserContext } from './user';
import { FirestoreProvider, FirestoreContext } from './firestore';
import { StorageProvider, StorageContext } from './storage';

export { AuthContext, UserContext, FirestoreContext, StorageContext };

export const Firebase = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <FirestoreProvider>
          <StorageProvider>
            {children}
          </StorageProvider>
        </FirestoreProvider>
      </UserProvider>
    </AuthProvider>
  );
};

Firebase.propTypes = {
  children: PropTypes.node.isRequired
};
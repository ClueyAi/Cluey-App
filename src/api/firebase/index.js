import React from 'react';

import { AuthProvider, AuthContext } from './authentication';
import { UserProvider, UserContext } from './user';
import { FirestoreProvider, FirestoreContext } from './firestore';
import { StorageProvider, StorageContext } from './storage';

export { AuthContext, UserContext, FirestoreContext, StorageContext };

const Firebase = ({ children }) => {
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

export default Firebase;
import React, { createContext } from 'react';
import PropTypes from "prop-types";

import { storage } from '../config';

export const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const uploadImage = async (file) => {
    const ref = storage.ref().child(file.name);
    const snapshot = await ref.put(file);
    const downloadURL = await snapshot.ref.getDownloadURL();
    return downloadURL;
  };

  const value = {
    uploadImage,
  };

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
};

StorageProvider.propTypes = {
  children: PropTypes.node.isRequired
};
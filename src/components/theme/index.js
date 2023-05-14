import React, { createContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import PropTypes from "prop-types";

import light from './light';
import dark  from './dark';
import shadow from './shadow';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(light);
  const [statusBar, setStatusBar] = useState(light);

  const toggleTheme = () => {
    setTheme(theme===light?light:dark);
    setStatusBar(theme===light?dark:light);
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}><StatusBar style={statusBar}/>{children}</ThemeContext.Provider>
  );
};

export { light, dark, shadow }

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};
import React, { createContext, useContext } from 'react';
import Constants from 'expo-constants';
import { FirestoreContext } from '../firebase';
import PropTypes from "prop-types";

export const OpenAIContext = createContext();

export const OpenAIProvider = ({ children }) => {
  const {createAiMessage} = useContext(FirestoreContext);
  const OPENAI_API_KEY = Constants.manifest.extra.openai.apiKey;

  const sendMessageToOpenAI = async (message) => {
    try {
      let responseMessage = '';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Organization': 'org-Eu29lJNtI2mtLuRsMvo9Jroy'
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: message.text,
          max_tokens: 120,
          temperature: 0.7,
          frequency_penalty: 0.5,
          presence_penalty: 0.5
        })
      };

      const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
      const data = await response.json();
      responseMessage = await data.choices[0].text.trim();
      const openAIMessage = {
        contextName: "Default",
        requestText: message.text,
        responseName: "Cluey",
        text: responseMessage,
        createdAt: new Date().toISOString(),
      };
      if (openAIMessage.text !== "" && openAIMessage.requestId !== null) {
        try {
          await createAiMessage(openAIMessage)
        } catch (error) {
          console.log(error.code);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const value = {
    sendMessageToOpenAI
  };

  return <OpenAIContext.Provider value={value}>{children}</OpenAIContext.Provider>;
};

OpenAIProvider.propTypes = {
  children: PropTypes.node.isRequired
};

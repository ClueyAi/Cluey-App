import React, { createContext, useContext } from 'react';
import Constants from 'expo-constants';
import { FirestoreContext } from '../firebase';
import PropTypes from "prop-types";

export const OpenAIContext = createContext();

export const OpenAIProvider = ({ children }) => {
  const {createAiMessage} = useContext(FirestoreContext);
  const OPENAI_API_KEY = Constants.manifest.extra.openai.apiKey;
  const OPENAI_ORG_ID = Constants.manifest.extra.openai.orgId;
  const OPENAI_MODAL = 'text-davinci-003';
  const MAX_TOKENS = 100;

  const checkOpenAIStatus = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/status');
      const data = await response.json();

      console.log('Status da API do OpenAI:', data);
  
      if (data.status === 'ok') {
        console.log('A API do OpenAI está online');
      } else {
        console.log('A API do OpenAI está offline');
        // Pare a sua API aqui
      }
    } catch (error) {
      console.log('Erro ao verificar o status da API do OpenAI:', error);
    }
  };

  const sendMessageToOpenAI = async (message) => {
    try {
      let responseMessage = '';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Organization': OPENAI_ORG_ID
        },
        body: JSON.stringify({
          model: OPENAI_MODAL,
          prompt: message.text,
          max_tokens: MAX_TOKENS,
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
    checkOpenAIStatus,
    sendMessageToOpenAI
  };

  return <OpenAIContext.Provider value={value}>{children}</OpenAIContext.Provider>;
};

OpenAIProvider.propTypes = {
  children: PropTypes.node.isRequired
};

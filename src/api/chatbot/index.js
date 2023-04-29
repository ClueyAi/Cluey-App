import React, { createContext, useContext } from 'react';
import { FirestoreContext } from '../firebase';
import PropTypes from "prop-types";

export const BotContext = createContext();

export const BotProvider = ({ children }) => {
  const {createBotMessage} = useContext(FirestoreContext);

  const processeMessage = async (message) => {
    const userMsg = (message.text).toLowerCase();
    let response = '';
    if (userMsg === 'oi cluey') {
      response = 'Olá, como posso ajudar?';
    } else if (userMsg === 'o que é o cluey?') {
      response = 'O Cluey é uma AI que faz tudo e mais...';
    } else if (userMsg === 'o que você faz?') {
      response = 'Eu faço tudo e mais... A sua imaginação é o limite. E o limite é a sua imaginação.';
    } else if (userMsg === 'o que você não faz?') {
      response = 'Nunca te deixo sem resposta.';
    }
    const botMessage = {
      userId: 'bot',
      requestId: message.userId,
      senderName: 'Cluey',
      text: response,
      createdAt: new Date().toISOString(),
    };
    if (botMessage.text !== "" && botMessage.requestId !== null) {
      try {
        await createBotMessage(botMessage)
      } catch (error) {
        console.log(error.code);
      }
    }
  };
  
  const value = {
    processeMessage
  };

  return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
};

BotProvider.propTypes = {
  children: PropTypes.node.isRequired
};
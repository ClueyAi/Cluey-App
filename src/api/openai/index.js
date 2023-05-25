import Constants from 'expo-constants';

export const sendMessageToOpenAI = async (text) => {
  const OPENAI_API_KEY = Constants.manifest.extra.openai.apiKey;
  const OPENAI_ORG_ID = Constants.manifest.extra.openai.orgId;
  const OPENAI_MODAL = 'text-davinci-003';
  const MAX_TOKENS = 1000;

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
        prompt: text,
        max_tokens: MAX_TOKENS,
      })
    };

    const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
    const data = await response.json();
    responseMessage = await data.choices[0].text.trim();
    
    return responseMessage;
  } catch (error) {
    console.error(error);
  }
};

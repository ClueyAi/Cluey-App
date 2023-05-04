import { Configuration, OpenAIApi } from 'openai';
import Constants from 'expo-constants';

const configuration = new Configuration({
  apiKey: Constants.manifest.extra.openai.apiKey,
});
export const openai = new OpenAIApi(configuration);

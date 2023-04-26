import { Platform, NativeModules } from 'react-native'

import en_US from './en_US.json'
import pt_PT from './pt_PT.json'
import pt_BR from './pt_BR.json'

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier

/*const locale = 
  deviceLanguage === 'pt_PT'
  ? pt_PT
  : en_US
  || deviceLanguage === 'pt_BR'
  ? pt_BR
  : en_US
  */
 const locale = en_US

export default locale
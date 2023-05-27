import React, { useContext, useState } from 'react';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from "prop-types";
import Flag from 'react-native-flags';

import { FirestoreContext } from '../../../../api/firebase';
import { LocaleContext } from '../../../../components/locale';
import { ThemeContext } from '../../../../components/theme';
import { 
  Container,
  Body,
  Main,
  View,
  ScrollView,
  H1, H3, P,
  WideButton,
  FooterSmall,
} from '../../../../components/styles';
import Picker from './Picker'

const Account = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  const {user} = useContext(FirestoreContext);
  const [modal, setModal] = useState(false);

  const profile = user?.profile;
  const country = user?.country;

  
  const handleChangeEmail = async () => {navigation.navigate('Email')};
  const handleChangePassword = async () => {navigation.navigate('Password')};
  const handleCountry = async () => {
    setModal(true)
  };
  
  return(
    <Container>
      <Body>
        <Main>
          <ScrollView style={{marginTop: 30}}>
            <WideButton onPress={handleChangeEmail}>
              <View style={{alignItems: 'flex-start'}}>
                <H3>{locale.email_config.title}</H3>
                <P>{profile?.email}</P>
              </View>
              <Ionicons name="chevron-forward" size={30} color={theme.textGray} />
            </WideButton>
            <WideButton onPress={handleChangePassword}>
              <View style={{alignItems: 'flex-start'}}>
                <H3>{locale.password_config.title}</H3>
              </View>
              <Ionicons name="chevron-forward" size={30} color={theme.textGray} />
            </WideButton>
            {Platform.OS !== 'web' ?
              <WideButton onPress={handleCountry}>
                <View style={{alignItems: 'flex-start'}}>
                  <H3>{locale.country_config.title}</H3>
                  {country?
                    <P><Flag code={country?.iso} size={16}/> {country?.name}</P>
                  :
                    <P>{locale.country_config.description}</P>
                  }
                </View>
                <Ionicons name="chevron-forward" size={30} color={theme.textGray} />
                <Picker modal={modal} setModal={setModal}/>
              </WideButton>
            :null}
          </ScrollView>
          {/*
          <Provider>
            <WideButton style={{marginVertical: 2}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="logo-google" size={26} color={theme.textGray} />
                <H3 style={{marginLeft: 30}}>Google</H3>
              </View>
              <H3 style={{marginRight: 10}}>Link</H3>
            </WideButton>
            <WideButton style={{marginVertical: 2}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="logo-apple" size={28} color={theme.textGray} />
                <H3 style={{marginLeft: 30}}>Apple</H3>
              </View>
              <H3 style={{marginRight: 10}}>Link</H3>
            </WideButton>
          </Provider>
          */}
        </Main>
        <FooterSmall>
          <View style={{marginTop: 10}}>
            <H1>{locale.global.app.name}</H1>
          </View>
        </FooterSmall>
      </Body>
      
    </Container>
  );
};

Account.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Account;
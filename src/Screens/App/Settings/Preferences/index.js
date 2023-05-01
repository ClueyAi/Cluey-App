import React, { useContext, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from "prop-types";
import CountryPicker from 'react-native-country-picker-modal';
import Flag from 'react-native-flags';

import { UserContext, FirestoreContext } from '../../../../api/firebase';

import { LocaleContext } from '../../../../components/locale';
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

const Preferences = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);
  const {profile, updateProfile} = useContext(FirestoreContext);
  const {user} = useContext(UserContext);
  const [countryModalVisible, setCountryModalVisible] = useState(false);

  const handleCountrySelect = async (country) => {
    try {
      const {cca2, name} = country;
      const profile = {
        code: cca2,
        country: name
      };
      await updateProfile(profile);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleChangeEmail = async () => {navigation.navigate('ChangeEmail')};
  const handleChangePassword = async () => {navigation.navigate('ChangePassword')};
  const handleCountry = async () => {
    setCountryModalVisible(true)
  };
  const handleCloseModal = () => {
    setCountryModalVisible(false);
  }
  
  return(
    <Container>
      <Body>
        <Main>
          <ScrollView style={{marginTop: 30}}>
            <WideButton onPress={handleChangeEmail}>
              <View style={{alignItems: 'flex-start'}}>
                <H3>{locale.email_config.title}</H3>
                <P>{user?.email}</P>
              </View>
              <Ionicons name="chevron-forward" size={30} color="#757575" />
            </WideButton>
            <WideButton onPress={handleChangePassword}>
              <View style={{alignItems: 'flex-start'}}>
                <H3>{locale.password_config.title}</H3>
              </View>
              <Ionicons name="chevron-forward" size={30} color="#757575" />
            </WideButton>
            <WideButton onPress={handleCountry}>
              <View style={{alignItems: 'flex-start'}}>
                <H3>{locale.anddress_config.title}</H3>
                <P>{profile?.code?<Flag code={profile?.code} size={16}/>:null} {profile?.country?profile?.country:locale.anddress_config.description}</P>
              </View>
              <Ionicons name="chevron-forward" size={30} color="#757575" />
            </WideButton>
          </ScrollView>
          {/*
          <Provider>
            <WideButton style={{marginVertical: 2}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="logo-google" size={26} color="#757575" />
                <H3 style={{marginLeft: 30}}>Google</H3>
              </View>
              <H3 style={{marginRight: 10}}>Link</H3>
            </WideButton>
            <WideButton style={{marginVertical: 2}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="logo-apple" size={28} color="#757575" />
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
      <CountryPicker
        visible={countryModalVisible}
        onSelect={handleCountrySelect}
        withFilter={true}
        withFlag={true}
        withCountryNameButton={true}
        onClose={handleCloseModal}
        onModalClose={handleCloseModal}
      />
    </Container>
  );
};

Preferences.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Preferences;
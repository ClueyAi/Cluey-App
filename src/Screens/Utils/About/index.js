import React, { useContext } from 'react'
import { Linking } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import UserAvatar from 'react-native-user-avatar';
import PropTypes from "prop-types";

import { LocaleContext} from '../../../components/locale';
import { 
  Container,
  Body,
  Main,
  Div,
  View,
  ScrollView,
  H1, H1Mini, H3, H3Bold, H5, P, PMini,
  ButtonEmpyte,
  Picture,
  Image,
  ProfileTeam,
  Footer,
  Team, Mentor,
  Partners,
} from '../../../components/styles';

const About = ({ navigation }) => {
  const {locale} = useContext(LocaleContext);

  const handleDesigner = async () => {Linking.openURL(locale.global.team.designer.site_url)};
  const handleDeveloper = async () => {Linking.openURL(locale.global.team.developer.site_url)};
  const handleTester = async () => {Linking.openURL(locale.global.team.tester.site_url)};

  const handleMentor1 = async () => {Linking.openURL(locale.global.mentor.mentor1.site_url)};
  const handleMentor2 = async () => {Linking.openURL(locale.global.mentor.mentor2.site_url)};
  const handleMentor3 = async () => {Linking.openURL(locale.global.mentor.mentor3.site_url)};

  const handleIslagaia = async () => {Linking.openURL(locale.global.partners.islagaia.site_url)};
  const handlePolicy = async () => {navigation.navigate("Rules")};
  const handleWebsite = async () => {Linking.openURL(locale.global.app.contact_us.website)};
  const handleGithub = async () => {Linking.openURL(locale.global.app.contact_us.github)};
  const handleFacebook = async () => {Linking.openURL(locale.global.app.contact_us.facebook)};
  

  return (
    <Container>
      <Body>
        <Main>
          <ScrollView style={{paddingTop: 20}}>
            <H3>{locale.global.team.title}</H3>
            <Team>
              <ButtonEmpyte onPress={handleDesigner}>
                <Picture>
                <ProfileTeam>
                  <UserAvatar size={65} style={{width: 65, height: 65, borderRadius: 100}} name={locale.global.team.designer.name} src={locale.global.team.designer.photo_url}/>
                  </ProfileTeam>
                </Picture>
                <H5>{locale.global.team.designer.name}</H5>
                <PMini>{locale.global.team.designer.office}</PMini>             
              </ButtonEmpyte>
              <ButtonEmpyte onPress={handleDeveloper}>
                <Picture>
                  <ProfileTeam>
                    <UserAvatar size={65} style={{width: 65, height: 65, borderRadius: 100}} name={locale.global.team.developer.name} src={locale.global.team.developer.photo_url}/>
                  </ProfileTeam>
                </Picture>
                <H5>{locale.global.team.developer.name}</H5>
                <PMini>{locale.global.team.developer.office}</PMini>           
              </ButtonEmpyte>
              <ButtonEmpyte onPress={handleTester}>
                <Picture>
                <ProfileTeam>
                  <UserAvatar size={65} style={{width: 65, height: 65, borderRadius: 100}} name={locale.global.team.tester.name} src={locale.global.team.tester.photo_url}/>
                  </ProfileTeam>
                </Picture>
                <H5>{locale.global.team.tester.name}</H5>
                <PMini>{locale.global.team.tester.office}</PMini>         
              </ButtonEmpyte>
            </Team>
            <H3 style={{marginTop: 20}}>{locale.global.mentor.title}</H3>
            <Mentor>
              <ButtonEmpyte onPress={handleMentor1}>
                <Picture>
                <ProfileTeam>
                  <UserAvatar size={65} style={{width: 65, height: 65, borderRadius: 100}} name={locale.global.mentor.mentor1.name} src={locale.global.mentor.mentor1.photo_url}/>
                  </ProfileTeam>
                </Picture>
                <H5>{locale.global.mentor.mentor1.name}</H5>           
              </ButtonEmpyte>
              <ButtonEmpyte onPress={handleMentor2}>
                <Picture>
                  <ProfileTeam>
                    <UserAvatar size={65} style={{width: 65, height: 65, borderRadius: 100}} name={locale.global.mentor.mentor2.name} src={locale.global.mentor.mentor2.photo_url}/>
                  </ProfileTeam>
                </Picture>
                <H5>{locale.global.mentor.mentor2.name}</H5>         
              </ButtonEmpyte>
              <ButtonEmpyte onPress={handleMentor3}>
                <Picture>
                <ProfileTeam>
                  <UserAvatar size={65} style={{width: 65, height: 65, borderRadius: 100}} name={locale.global.mentor.mentor3.name} src={locale.global.mentor.mentor3.photo_url}/>
                  </ProfileTeam>
                </Picture>
                <H5>{locale.global.mentor.mentor3.name}</H5>        
              </ButtonEmpyte>
            </Mentor>
            <H3 style={{marginTop: 20}}>{locale.global.partners.title}</H3>
            <Partners>
              <ButtonEmpyte onPress={handleIslagaia}>
                <Picture>
                  <Image style = {{ width: 216, height: 91.2 }} source={{uri: locale.global.partners.islagaia.logo_url}}/>
                </Picture>   
              </ButtonEmpyte>
            </Partners>
            <View style={{marginTop: 30, alignItems: 'center'}}>
              <Image style={{width: 90.6, height: 132}} source={require('../../../../assets/images/cluey.png')} />
              <View style={{flexDirection: 'row', marginTop: -5}}>
                <H1Mini style={{fontSize: 16, padding: 2}}>©</H1Mini>
                <H1 style={{fontSize: 16, padding: 2}}>{locale.global.app.name}</H1>
                <H1Mini style={{fontSize: 16, padding: 2}}>2023</H1Mini>
              </View>
            </View>
            <View style={{marginTop: 30, marginBottom: 60, alignItems: 'center'}}>
              <H3Bold>{locale.global.app.resume_title}</H3Bold>
              <P style={{width: '90%', textAlign: 'justify', marginTop: 5}}>{locale.global.app.resume}</P>
            </View>
          </ScrollView>
        </Main>
        <Footer>
          <ButtonEmpyte 
            style={{color: '#fff'}}
            onPress={handlePolicy}  
          >
            <P>{locale.global.app.policy_terms.title}</P>
          </ButtonEmpyte>
          <H3 style={{marginTop: 5}}>{locale.global.app.contact_us.title}</H3>
          <Div style={{flexDirection: 'row', padding: 5}}>
            <ButtonEmpyte style={{color: '#fff', paddingHorizontal: 5}} onPress={handleWebsite}>
              <FontAwesome5 name="globe" size={28} color="#757575" />
            </ButtonEmpyte>
            <ButtonEmpyte style={{color: '#fff', paddingHorizontal: 5}} onPress={handleGithub}>
              <FontAwesome5 name="github" size={28} color="#757575" />
            </ButtonEmpyte>
            <ButtonEmpyte style={{color: '#fff', paddingHorizontal: 5}} onPress={handleFacebook}>
              <FontAwesome5 name="facebook" size={28} color="#757575" />
            </ButtonEmpyte>
          </Div>
        </Footer>
      </Body>
    </Container>
  );
};

About.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default About;
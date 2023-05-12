import styled from 'styled-components/native';

import { light } from '../theme';

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};

export const Avoiding = styled.KeyboardAvoidingView``;
export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: ${light.background};
`;
export const Content = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;
export const Heading = styled.View`
  width: 285px;
`;
export const Body = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const Main = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
`;
export const Div = styled.View`
  flex: 1;
  width: 100%;
  text-align: center;
  justify-content: center;
`;
export const View = styled.View``;
export const ModalButton = styled.View`
  width: 100px;
  padding: 3px;
  border-radius: 30px;
  background-color: ${light.primary};
`;
export const ScrollView = styled.ScrollView`
  width: 100%;
  flex-direction: column;
`;
export const Divider = styled.View`
  width: 40%;
  margin: 5px 10px 0 10px;
  border-bottom-color: ${light.border};
  border-bottom-width: 1px;
`;
export const Providers = styled.View`
  width: 88%;
  align-items: center;
`;
export const Form = styled.View`
  width: 88%;
  align-items: center;
`;
export const Input = styled.View`
  width: 100%;
  height: 45px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  background-color: ${light.background};
`;
export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'Nunito';
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-left: 10px;
  color: ${light.text};
`;

// Texts
export const H0 = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 28px;
  color: ${light.primary};
`;
export const H1 = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 24px;
  color: ${light.primary};
`;
export const H1Mini = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 22px;
  color: ${light.text};
`;
export const H2 = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 19px;
  color: ${light.textDark};
`;
export const H2Mini = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 16px;
  color: ${light.textDark};
`;
export const H3 = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: center;
  font-size: 16px;
  color: ${light.textDark};
`;
export const H3Bold = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 16px;
  color: ${light.textDark};
`;
export const H4 = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: center;
  font-size: 14px;
  color: ${light.textDark};
`;
export const H5 = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 12px;
  color: ${light.textDark};
`;
export const P = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 15px;
  color: ${light.textGray};
`;
export const PMini = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 13px;
  color: ${light.textGray};
`;
export const Title = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: left;
  font-size: 16px;
  margin-bottom: 10px;
  color: ${light.textDark};
`;
export const Text = styled.Text`
  font-family: 'Nunito';
  text-align: justify;
  font-size: 15px;
  margin-bottom: 10px;
  color: ${light.textGray};
`;
export const TextList = styled.Text`
  font-family: 'Nunito';
  text-align: left;
  font-size: 15px;
  margin-bottom: 10px;
  margin-left: 10px;
  color: ${light.textGray};
`;
export const TxtLink = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: center;
  font-size: 16px;
  color: ${light.link};
`;
export const TxtButton = styled.Text`
  font-family: 'Nunito-Bold';
  font-size: 19px;
  color: ${light.background};
`;
export const TxtProvider = styled.Text`
  font-family: 'Nunito-Bold';
  font-size: 16px;
  color: ${light.textDark};
`;
export const Link = styled.Text`
  font-family: 'Nunito-Bold';
  font-size: 14px;
  color: ${light.link};
`;

// Images
export const Image = styled.Image``;

// Buttons
export const Button = styled.TouchableOpacity`
  text-align: center;
  justify-content: center;
  align-items: center;
`;
export const ButtonPrimary = styled.TouchableOpacity`
  width: 333px;
  height: 56px;
  border-radius: 30px;
  background-color: ${light.primary};
  justify-content: center;
  align-items: center;
`;
export const ButtonSecondary = styled.TouchableOpacity`
  width: 333px;
  height: 56px;
  border-radius: 30px;
  background-color: ${light.secondary};
  justify-content: center;
  align-items: center;
`;
export const ButtonProvider = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  border-width: 0.2px;
  border-color: ${light.text};
  background-color: ${light.background};
`;
export const ButtonMulti = styled.TouchableOpacity`
  width: 333px;
  height: 56px;
  border-radius: 30px;
  background-color: ${light.primary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;
`;
export const WideButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px 30px;
`;
export const LogoutButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 50px;
  right: 10px;
`;
export const AbsoluteButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
`;
export const ButtonEmpyte = styled.TouchableOpacity``;

// cunstoms
export const InterestsBtn = styled.View`
  flex-wrap: wrap;
`;

// Home
export const ChatTitle = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 20px;
  color: ${light.primary};
`;
export const Status = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 13px;
  color: ${light.secondary};
`;
export const ChatBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 2%;
  padding-left: 5%;
  padding-right: 5%;
`;
export const ChatInput = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  border-width: 0.1px;
  border-color: ${light.text};
  background-color: ${light.background};
`;
export const ChatTextInput = styled.TextInput`
  flex: 1;
  align-self: center;
  font-family: 'Nunito-Bold';
  width: 100%;
  height: 100%;
  padding: 15px;
  margin-left: 10px;
  color: ${light.text};
`;
export const ChatMessages = styled.View`
  flex-direction: column;
  margin: 5px 20px 20px 20px;
`;
export const RequestMessages = styled.View`
  flex-direction: row;
  align-self: flex-end;
`;
export const ResponseMessages = styled.View`
  flex-direction: row;
  align-self: flex-start;
`;
export const MessageRight = styled.View`
  max-width: 95%;
  min-width: 100px;
  align-self: flex-end;
  padding: 10px;
  border-radius: 10px;
  margin-left: 10px;
  background-color: ${light.secondarySoft};
`;
export const MessageLeft = styled.View`
  max-width: 95%;
  min-width: 100px;
  align-self: flex-start;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
  background-color: ${light.primarySoft};
`;
export const NameText = styled.Text`
  font-family: 'Nunito-ExtraBold';
  text-align: left;
  font-size: 16px;
  margin-top: 3px;
  color: ${generateColor()};
`;
export const MessageText = styled.Text`
  font-family: 'Nunito-Medium';
  text-align: left;
  font-size: 16px;
  margin-top: 3px;
  color: ${light.text};
`;
export const DateText = styled.Text`
  font-family: 'Nunito';
  text-align: right;
  font-size: 13px;
  color: ${light.textDark};
`;

// Loading
export const ActivityIndicator = styled.ActivityIndicator``;

// Settings
export const Profile = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Picture = styled.View`
  justify-content: center;
  align-items: center;

`;
export const ProfilePicture = styled.View`
  width: 110px;
  height: 110px;
  border-radius: 100px;
  border: 4px solid ${light.primary};
  justify-content: center;
  align-items: center;
`;
export const PictureEdit = styled.View`
  width: 19px;
  height: 19px;
  margin-top: -20px;
  left: 25px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${light.primary};
`;
export const Infor = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const Provider = styled.View`
  width: 100%;
  flex-direction: column;
  padding: 15px 0;
  border-top-width: 2px;
  border-color: ${light.border};
`;
export const Footer = styled.View`
  width: 100%;
  height: 130px;
  padding-top: 20px;
  flex-direction: column;
`;
export const FooterSmall = styled.View`
  width: 100%;
  height: 110px;
  padding-top: 20px;
  flex-direction: column;
`;

// About
export const Team = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 0 40px;
`;
export const Mentor = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 0 40px;
`;
export const ProfileTeam = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 100px;
  border: 3px solid ${light.primary};
  justify-content: center;
  align-items: center;
`;
export const Partners = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 0 40px;
`;
export const ProfilePartners = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 100px;
  border: 3px solid ${light.primary};
  justify-content: center;
  align-items: center;
`;

// Cluey background styles
export const BgMark = styled.View`
  position: absolute;
  top: 480px;
  z-index: -1;
  opacity: 0.7;
`;
export const LogoBg = styled.Image`
  transform: scaleX(1.1) scaleY(1.1);
`;
export const LogoName = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
  color: ${light.primary};
  opacity: 0.3;
`;

// Errors styles
export const TextError = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
  color: ${light.error};
`;
export const TextValid = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
  color: ${light.secondary};
`;
export const TextAlert= styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
  color: ${light.primary};
`;

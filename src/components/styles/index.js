import styled from 'styled-components/native';

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
  background-color: ${props => props.theme.background};
`;
export const Header = styled.View`
  flex: 1;
  width: 100%;
  max-height: 70px;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 15px;
  border-bottom-width: 2px;
  border-color: ${props => props.theme.border};
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
export const ScrollView = styled.ScrollView`
  width: 100%;
  flex-direction: column;
`;
export const Form = styled.View`
  width: 80%;
  align-items: center;
  z-index: 1;
`;
export const Input = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props => props.theme.input};
  border-radius: 30px;
  height: 45px;
  align-items: center;
`;
export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'Nunito';
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-left: 10px;
  color: ${props => props.theme.text};
`;

// Texts
export const H1 = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 24px;
  color: ${props => props.theme.primary};
`;
export const H1Mini = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 22px;
  color: ${props => props.theme.background};
`;
export const H2 = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 19px;
  color: ${props => props.theme.textDark};
`;
export const H3 = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: center;
  font-size: 16px;
  color: ${props => props.theme.textDark};
`;
export const H3Bold = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 16px;
  color: ${props => props.theme.textDark};
`;
export const H4 = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: center;
  font-size: 14px;
  color: ${props => props.theme.textDark};
`;
export const H5 = styled.Text`
  font-family: 'Nunito-Bold';
  text-align: center;
  font-size: 12px;
  color: ${props => props.theme.textDark};
`;
export const P = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 15px;
  color: ${props => props.theme.textGray};
`;
export const PMini = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 13px;
  color: ${props => props.theme.textGray};
`;
export const Tittle = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: left;
  font-size: 16px;
  margin-bottom: 10px;
  color: ${props => props.theme.textDark};
`;
export const Text = styled.Text`
  font-family: 'Nunito';
  text-align: justify;
  font-size: 15px;
  margin-bottom: 10px;
  color: ${props => props.theme.textGray};
`;
export const TextList = styled.Text`
  font-family: 'Nunito';
  text-align: left;
  font-size: 15px;
  margin-bottom: 10px;
  margin-left: 10px;
  color: ${props => props.theme.textGray};
`;
export const TxtLink = styled.Text`
  font-family: 'Nunito-SemiBold';
  text-align: center;
  font-size: 16px;
  color: ${props => props.theme.textDark};
`;
export const TxtButton = styled.Text`
  font-family: 'Nunito-Bold';
  font-size: 19px;
  color: ${props => props.theme.textButton};
`;
export const StatusOnline = styled.Text`
  font-family: 'Nunito';
  text-align: left;
  margin-left: 5px;
  font-size: 13px;
  color: ${props => props.theme.valid};
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
  background-color: ${props => props.theme.primary};
  justify-content: center;
  align-items: center;
`;
export const ButtonSecondary = styled.TouchableOpacity`
  width: 333px;
  height: 56px;
  border-radius: 30px;
  background-color: ${props => props.theme.secondary};
  justify-content: center;
  align-items: center;
`;
export const ButtonMulti = styled.TouchableOpacity`
  width: 333px;
  height: 56px;
  border-radius: 30px;
  background-color: ${props => props.theme.primary};
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
export const BackButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 50px;
  left: 10px;
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

// Home
export const ChatBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2% 5% 5% 5%;
`;
export const ChatInput = styled.View`
  width: 100%;
  height: 56px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  background-color: ${props => props.theme.background};
`;
export const ChatTextInput = styled.TextInput`
  flex: 1;
  font-family: 'Nunito-Bold';
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-left: 10px;
  color: ${props => props.theme.text};
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
export const Request = styled.View`
  max-width: 95%;
  align-self: flex-end;
  padding: 10px;
  border-radius: 10px;
  margin-left: 10px;
  background-color: ${props => props.theme.secondarySoft};
`;
export const Response = styled.View`
  max-width: 95%;
  align-self: flex-start;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
  background-color: ${props => props.theme.primarySoft};
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
  font-size: 17px;
  margin-top: 3px;
  color: ${props => props.theme.text};
`;
export const DateText = styled.Text`
  font-family: 'Nunito';
  text-align: right;
  font-size: 13px;
  color: ${props => props.theme.textDark};
`;

// Loading
export const ActivityIndicator = styled.ActivityIndicator``;

// Settings
export const Profile = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
export const Picture = styled.View`
  justify-content: center;
  align-items: center;

`;
export const ProfilePicture = styled.View`
  width: 110px;
  height: 110px;
  border-radius: 100px;
  border: 4px solid ${props => props.theme.primary};
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
  background-color: ${props => props.theme.primary};
`;
export const Infor = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;
`;
export const Provider = styled.View`
  width: 100%;
  flex-direction: column;
  padding: 15px 0;
  border-top-width: 2px;
  border-color: ${props => props.theme.border};
`;
export const Footer = styled.View`
  width: 100%;
  height: 130px;
  padding-top: 20px;
  flex-direction: column;
  border-top-width: 2px;
  border-color: ${props => props.theme.border};
`;
export const FooterSmall = styled.View`
  width: 100%;
  height: 110px;
  padding-top: 20px;
  flex-direction: column;
  border-top-width: 2px;
  border-color: ${props => props.theme.border};
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
  border: 3px solid ${props => props.theme.primary};
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
  border: 3px solid ${props => props.theme.primary};
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
  color: ${props => props.theme.primary};
  opacity: 0.3;
`;

// Errors styles
export const TextError = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
  color: ${props => props.theme.error};
`;
export const TextValid = styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
  color: ${props => props.theme.valid};
`;
export const TextAlert= styled.Text`
  font-family: 'Nunito';
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
  color: ${props => props.theme.alert};
`;
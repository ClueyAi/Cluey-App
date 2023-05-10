import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import UserAvatar from "react-native-user-avatar";
import PropTypes from "prop-types";

import { ThemeContext } from "../../../../components/theme";
import {
  View,
  Profile,
  Picture,
  ProfilePicture,
  Infor,
  H4,
  H5,
} from "../../../../components/styles";

const Peoples = ({ item }) => {
  const { theme } = useContext(ThemeContext);

	const styles = StyleSheet.create({
    cards: {
      flex: 1,
      flexDirection: 'column',
      alignSelf: 'center',
      width: '95%',
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 20,
      paddingHorizontal: 10,
      backgroundColor: theme.background, 
    },
    data: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
    shadow: {
      shadowColor: "#000000",
      shadowOffset: {width: 0, height: 3},
      shadowOpacity:  0.17,
      shadowRadius: 3.05,
      elevation: 4
    }
  });

  return (
    <View style={{ ...styles.shadow, ...styles.cards }}>
      <View style={styles.data}>
        <Profile
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            height: 50,
          }}
        >
          <Picture>
            <ProfilePicture style={{ width: 40, height: 40, borderWidth: 10 }}>
              <UserAvatar
                size={38}
                style={{ width: 38, height: 38, borderRadius: 100 }}
                name={item.displayName}
                src={item.photoURL}
              />
            </ProfilePicture>
          </Picture>
          <Infor
            style={{
              width: "auto",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: 5,
            }}
          >
            <H4>{item.displayName}</H4>
            <H5>{item.email}</H5>
          </Infor>
        </Profile>
      </View>
    </View>
  );
};

Peoples.propTypes = {
	item: PropTypes.object.isRequired,
};

export default Peoples;

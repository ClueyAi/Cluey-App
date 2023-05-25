import React from "react";
import { StyleSheet } from "react-native";
import UserAvatar from "react-native-user-avatar";
import PropTypes from "prop-types";

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
  const contact = item?.profile;

	const styles = StyleSheet.create({
    cards: {
      flex: 1,
      flexDirection: 'column',
    },
    data: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    }
  });

  return (
    <View style={{...styles.cards }}>
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
                name={contact?.displayName}
                src={contact?.photoURL? contact?.photoURL : null}
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
            <H4>{contact?.displayName}</H4>
            <H5>{contact?.email}</H5>
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

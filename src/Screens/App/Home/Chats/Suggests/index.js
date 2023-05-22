import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import PropTypes from "prop-types";

import { ThemeContext } from "../../../../../components/theme";
import {
  Main,
  View,
  Profile,
  Infor,
  H4,
} from "../../../../../components/styles";

const Suggests = ({ item }) => {
  const { theme } = useContext(ThemeContext);

	const styles = StyleSheet.create({
    cards: {
      flex: 1,
      flexDirection: 'row',
    },
    data: {
      flex: 1,
      flexDirection: 'column',
      alignSelf: 'center',
    },
    actions: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      marginRight: 5,
    }
  });

  return (
    <Main style={styles.cards}>
      <View style={styles.data}>
        <Profile
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            height: 40,
            paddingLeft: 10,
          }}
        >
          <AntDesign name="staro" size={22} color={theme.text} />
          <Infor
            style={{
              width: "auto",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: 15,
            }}
          >
            <H4>{item.name}</H4>
          </Infor>
        </Profile>
      </View>
    </Main>
  );
};

Suggests.propTypes = {
	item: PropTypes.object.isRequired,
};

export default Suggests;

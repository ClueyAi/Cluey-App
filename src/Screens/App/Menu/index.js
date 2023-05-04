import React from "react";
import PropTypes from "prop-types";

import {
  Container,
} from "../../../components/styles";

const Menu = () => {
  return (
      <Container/>
  );
};

Menu.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Menu;

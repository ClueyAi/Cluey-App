import React, { useContext } from 'react';
import PropTypes from "prop-types";
import CountryPicker from 'react-native-country-picker-modal';

import { FirestoreContext } from '../../../../../api/firebase';

const Picker = ({ modal, setModal }) => {
  const {putCountry} = useContext(FirestoreContext);

  const handleCountrySelect = async (country) => {
    try {
      const {cca2, name} = country;
      await putCountry(cca2, name);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleCloseModal = () => {
    setModal(false);
  }
  if (modal) {
    return(
      <CountryPicker
        visible={modal}
        onSelect={handleCountrySelect}
        withFilter={true}
        withFlag={true}
        withCountryNameButton={true}
        onClose={handleCloseModal}
        onModalClose={handleCloseModal}
      />
    )
  } else {
    return;
  }
};

Picker.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default Picker;
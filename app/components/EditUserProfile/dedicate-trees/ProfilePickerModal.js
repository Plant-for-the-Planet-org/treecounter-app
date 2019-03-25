import ModalDialog from '../../Common/ModalDialog';
import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import SearchAutosuggest from '../../Header/SearchAutosuggest';

const ProfilePickerModal = ({ isOpen, onRequestClose, suggestionClicked }) => (
  <ModalDialog isOpen={isOpen} onRequestClose={onRequestClose}>
    <div>
      <SearchAutosuggest
        onSuggestionClicked={suggestionClicked}
        clearSuggestions={false}
      />
      <PrimaryButton> Pick Profile</PrimaryButton>
    </div>
  </ModalDialog>
);

ProfilePickerModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  suggestionClicked: PropTypes.func
};

export default ProfilePickerModal;

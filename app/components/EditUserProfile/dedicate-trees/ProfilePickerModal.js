import ModalDialog from '../../Common/ModalDialog';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import SearchAutosuggest from '../../Header/SearchAutosuggest';

class ProfilePickerModal extends Component {
  constructor() {
    super();
    this.state = { selectedSuggestion: null };
  }
  render() {
    const { isOpen, onRequestClose, pickupProfile } = this.props;
    return (
      <ModalDialog isOpen={isOpen} onRequestClose={onRequestClose}>
        <div>
          <SearchAutosuggest
            onSuggestionClicked={this.suggestionClicked.bind(this)}
            clearSuggestions={false}
          />
          {this.state.selectedSuggestion ? (
            <PrimaryButton
              onClick={() => pickupProfile(this.state.selectedSuggestion)}
            >
              Pick Profile
            </PrimaryButton>
          ) : null}
        </div>
      </ModalDialog>
    );
  }
  suggestionClicked(event, value) {
    this.setState({ selectedSuggestion: value.suggestion.treecounterId });
  }
}

ProfilePickerModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  pickupProfile: PropTypes.func
};

export default ProfilePickerModal;

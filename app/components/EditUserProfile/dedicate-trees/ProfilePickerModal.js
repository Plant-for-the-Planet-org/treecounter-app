import ModalDialog from '../../Common/ModalDialog';
import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = lazy(() => import('../../Common/Button/PrimaryButton'));
const SearchAutosuggest = lazy(() => import('../../Header/SearchAutosuggest'));

import i18n from '../../../locales/i18n.js';

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
              {i18n.t('label.pick_profile')}
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

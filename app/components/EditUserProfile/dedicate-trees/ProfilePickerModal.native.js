import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styles from '../../../styles/edit_profile.native';
import { View, ScrollView, Text } from 'react-native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { connect } from 'react-redux';
import SearchUser from '../../GiftTrees/Tabs/SearchUser';
import { currentUserProfileSelector } from '../../../selectors';

import { updateProfileDedication } from '../../../actions/updateUserProfile';
import { bindActionCreators } from 'redux';

class ProfilePickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: null, selectedSuggection: null };
  }

  onSearchResultClick(event) {
    this.setState({ selectedSuggection: event });
  }
  updateProfile() {
    this.setState({ editMode: true });
  }
  onDedicateClick() {
    this.props.updateProfileDedication({
      supportedTreecounter: this.state.selectedSuggection.id
    });
  }

  render() {
    const { currentUserProfile } = this.props;
    const pickupProfileView = (
      <View style={{ flex: 1 }}>
        <SearchUser
          onSearchResultClick={this.onSearchResultClick.bind(this)}
          currentUserProfile={this.props.currentUserProfile}
        />
        {this.state.selectedSuggection ? (
          <View style={{ flexDirection: 'row' }}>
            <Text>{this.state.selectedSuggection.name}</Text>
            <PrimaryButton
              buttonStyle={styles.buttonStyle}
              onClick={() => {
                this.onDedicateClick.bind(this);
              }}
            >
              {'Dedicate'}
            </PrimaryButton>
          </View>
        ) : null}
      </View>
    );

    return (
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}>
        {this.state.editMode ? pickupProfileView : null}
        {currentUserProfile.supportedTreecounter ? (
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text>{currentUserProfile.supportedTreecounter.displayName}</Text>
            <PrimaryButton
              buttonStyle={styles.buttonStyle}
              onClick={this.updateProfile.bind(this)}
            >
              {'Pickup Profile'}
            </PrimaryButton>
          </View>
        ) : (
          pickupProfileView
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateProfileDedication
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePickerModal);
ProfilePickerModal.propTypes = {
  onSave: PropTypes.any
};

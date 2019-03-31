import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styles from '../../../styles/edit_profile.native';
import { View, ScrollView } from 'react-native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { connect } from 'react-redux';
import SearchUserNative from '../../GiftTrees/Tabs/SearchUser.native';
import { currentUserProfileSelector } from '../../../selectors';

class ProfilePickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedSuggestion: null };
  }

  onSearchResultClick() {
    console.log('clicked');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}>
        <View>
          <SearchUserNative
            onSearchResultClick={this.onSearchResultClick}
            currentUserProfile={this.props.currentUserProfile}
          />
          <View style={styles.bottomRow}>
            <PrimaryButton
              buttonStyle={styles.buttonStyle}
              onClick={() => {
                this.props.navigation.goBack(null);
              }}
            >
              {'Pickup Profile'}
            </PrimaryButton>

            <PrimaryButton
              buttonStyle={styles.buttonStyle}
              onClick={() => {
                this.props.navigation.goBack(null);
              }}
            >
              {'Go Back'}
            </PrimaryButton>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: currentUserProfileSelector(state)
});

export default connect(mapStateToProps)(ProfilePickerModal);
ProfilePickerModal.propTypes = {
  onSave: PropTypes.any
};

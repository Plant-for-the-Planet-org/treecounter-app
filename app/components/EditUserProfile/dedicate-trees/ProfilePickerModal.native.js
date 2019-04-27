import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styles from '../../../styles/profilepicker.native';
import { View, ScrollView, Text } from 'react-native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { connect } from 'react-redux';
import SearchUser from '../../GiftTrees/Tabs/SearchUser';
import { currentUserProfileSelector } from '../../../selectors';

import i18n from '../../../locales/i18n';
import { updateProfileDedication } from '../../../actions/updateUserProfile';
import { bindActionCreators } from 'redux';
import CardLayout from '../../Common/Card';
import scrollStyle from '../../../styles/common/scrollStyle';
import TabContainer from '../../../containers/Menu/TabContainer';
import UserProfileImage from '../../Common/UserProfileImage.native';

class ProfilePickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: null, selectedSuggestion: null };
  }

  onSearchResultClick(event) {
    console.log(event);
    this.setState({ selectedSuggestion: event });
  }

  updateProfile() {
    this.setState({ editMode: true });
  }

  onDedicateClick() {
    this.props.updateProfileDedication({
      supportedTreecounter: this.state.selectedSuggestion.id
    });
    this.setState({ editMode: false });
  }

  render() {
    const { currentUserProfile } = this.props;
    console.log(currentUserProfile);
    const pickupProfileView = (
      <CardLayout style={[styles.projectSnippetContainer]}>
        <View style={styles.searchUserStyle}>
          <SearchUser
            onSearchResultClick={this.onSearchResultClick.bind(this)}
            currentUserProfile={this.props.currentUserProfile}
          />
          {this.state.selectedSuggestion ? (
            <View style={styles.containerStyle}>
              <View style={styles.topCompetitorName}>
                <Text style={styles.textStyle}>
                  {this.state.selectedSuggestion.name}
                </Text>
              </View>
              <View style={styles.topCompetitorScore}>
                <PrimaryButton
                  buttonStyle={styles.buttonStyle}
                  textStyle={styles.primaryButtonText}
                  onClick={this.onDedicateClick.bind(this)}
                >
                  {i18n.t('label.dedicate')}
                </PrimaryButton>
              </View>
            </View>
          ) : null}
        </View>
      </CardLayout>
    );

    return (
      <View>
        <ScrollView contentContainerStyle={scrollStyle.styleContainer}>
          <View>
            {this.state.editMode ? pickupProfileView : null}
            {currentUserProfile.supportedTreecounter ? (
              <CardLayout style={[styles.projectSnippetContainer]}>
                <View style={styles.containerStyle}>
                  <View style={styles.topCompetitorName}>
                    <Text style={styles.textStyle}>
                      {currentUserProfile.supportedTreecounter.displayName}
                    </Text>
                  </View>
                  <View style={styles.topCompetitorScore}>
                    <PrimaryButton
                      buttonStyle={styles.buttonStyle}
                      textStyle={styles.primaryButtonText}
                      onClick={this.updateProfile.bind(this)}
                    >
                      {i18n.t('label.edit')}
                    </PrimaryButton>
                  </View>
                </View>
              </CardLayout>
            ) : (
              pickupProfileView
            )}
          </View>
        </ScrollView>
      </View>
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

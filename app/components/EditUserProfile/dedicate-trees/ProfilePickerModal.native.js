import React, { Component } from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debug } from '../../../debug';
import styles from '../../../styles/profilepicker.native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import SearchUser from '../../GiftTrees/Tabs/SearchUser';
import { currentUserProfileSelector } from '../../../selectors';
import i18n from '../../../locales/i18n';
import { updateProfileDedication } from '../../../actions/updateUserProfile';
import CardLayout from '../../Common/Card';
import UserProfileImage from '../../Common/UserProfileImage.native';
import { delimitNumbers } from '../../../utils/utils';
import HeaderNew from '../../Header/HeaderNew.native';
import colors from '../../../utils/contants';

class ProfilePickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: null, selectedSuggestion: null };
  }

  onSearchResultClick(event) {
    debug(event);
    this.setState({ selectedSuggestion: event });
  }

  updateProfile() {
    this.setState({ editMode: true });
  }

  onDedicateClick() {
    this.props.updateProfileDedication({
      supportedTreecounter: this.state.selectedSuggestion.treecounterId
    });
    this.setState({ editMode: false });
  }

  render() {
    const { currentUserProfile } = this.props;
    const pickupProfileView = (
      <View>
        <View style={styles.containerDedicateStyle}>
          <View style={styles.dedicateTreeName}>
            <Text style={styles.textNotDedicateStyle}>
              {i18n.t('label.has_not_dedicated')}
            </Text>
          </View>
        </View>
        <CardLayout style={[styles.projectSnippetContainer]}>
          <View style={styles.searchUserStyle}>
            <SearchUser
              onSearchResultClick={this.onSearchResultClick.bind(this)}
              currentUserProfile={this.props.currentUserProfile}
              hideCompetitions
            />
            {this.state.selectedSuggestion ? (
              <View style={styles.containerStyle}>
                <View style={styles.topCompetitorName}>
                  <UserProfileImage
                    profileImage={this.state.selectedSuggestion.image}
                    imageCategory={this.state.selectedSuggestion.category}
                    imageType="avatar"
                    imageStyle={{
                      height: 40,
                      width: 40,
                      borderRadius: 40 / 2
                    }}
                    defaultType={this.state.selectedSuggestion.type}
                  />
                  <View style={styles.participantNameContainer}>
                    <Text style={styles.textStyle}>
                      {this.state.selectedSuggestion.name}
                    </Text>
                  </View>
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
      </View>
    );

    return (
      <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
        <HeaderNew
          navigation={this.props.navigation}
          title={i18n.t('label.dedicate_trees')}
        />
        <ScrollView
          contentContainerStyle={[
            { marginTop: Platform.OS === 'ios' ? 140 : 100 }
          ]}
        >
          <View>
            {this.state.editMode ? pickupProfileView : null}
            {currentUserProfile.supportedTreecounter ? (
              <View>
                <View style={styles.containerDedicateStyle}>
                  <View style={styles.dedicateTreeName}>
                    <Text style={styles.textDedicateStyle}>
                      {i18n.t('label.has_dedicated', {
                        user:
                          currentUserProfile.supportedTreecounter.displayName
                      })}
                    </Text>
                  </View>
                </View>
                <CardLayout style={[styles.projectSnippetContainer]}>
                  <View style={styles.containerStyle}>
                    <View style={styles.topCompetitorName}>
                      <UserProfileImage
                        profileImage={
                          currentUserProfile.supportedTreecounter.avatar
                        }
                        imageStyle={{
                          width: 40,
                          height: 40,
                          borderRadius: 40 / 2
                        }}
                      />
                      <View style={styles.participantNameContainer}>
                        <Text style={styles.textStyle}>
                          {currentUserProfile.supportedTreecounter.displayName}
                        </Text>
                        <Text style={styles.topCompetitorScoreText}>
                          {delimitNumbers(
                            currentUserProfile.supportedTreecounter.countPlanted
                          )}{' '}
                          {i18n.t('label.planted')}
                        </Text>
                      </View>
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
              </View>
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

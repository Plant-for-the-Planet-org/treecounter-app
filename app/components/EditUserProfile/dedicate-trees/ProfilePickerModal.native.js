import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styles from '../../../styles/profilepicker.native';
import { View, ScrollView, Text } from 'react-native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { connect } from 'react-redux';
import SearchUser from '../../GiftTrees/Tabs/SearchUser';
import { currentUserProfileSelector } from '../../../selectors';

import { updateProfileDedication } from '../../../actions/updateUserProfile';
import { bindActionCreators } from 'redux';
import CardLayout from '../../Common/Card';
import TabContainer from '../../../containers/Menu/TabContainer';

class ProfilePickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: null, selectedSuggestion: null };
  }

  onSearchResultClick(event) {
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
    const pickupProfileView = (
      <CardLayout>
        <View>
          <SearchUser
            onSearchResultClick={this.onSearchResultClick.bind(this)}
            currentUserProfile={this.props.currentUserProfile}
          />
          {this.state.selectedSuggestion ? (
            <View style={styles.containerStyle}>
              <Text style={styles.textStyle}>
                {this.state.selectedSuggestion.name}
              </Text>
              <PrimaryButton
                buttonStyle={styles.buttonStyle}
                onClick={this.onDedicateClick.bind(this)}
              >
                {'Dedicate'}
              </PrimaryButton>
            </View>
          ) : null}
        </View>
      </CardLayout>
    );

    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          {this.state.editMode ? pickupProfileView : null}
          {currentUserProfile.supportedTreecounter ? (
            <CardLayout>
              <View style={styles.containerStyle}>
                <Text style={styles.textStyle}>
                  {currentUserProfile.supportedTreecounter.displayName}
                </Text>
                <PrimaryButton
                  buttonStyle={styles.buttonStyle}
                  onClick={this.updateProfile.bind(this)}
                >
                  Edit
                </PrimaryButton>
              </View>
            </CardLayout>
          ) : (
            pickupProfileView
          )}
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flex: 1,
            width: '100%'
          }}
        >
          <TabContainer {...this.props} />
        </View>
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

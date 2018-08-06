import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../actions/apiRouting';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/common/user-home';
import i18n from '../../locales/i18n';
import LoadingIndicator from '../Common/LoadingIndicator';
import PrimaryButton from '../Common/Button/PrimaryButton';
import SvgContainer from '../Common/SvgContainer';

export default class UserHome extends Component {
  constructor(props) {
    super(props);

    let svgData = {};
    const { treecounterData, userProfile } = props;
    if (treecounterData) {
      svgData = { ...treecounterData, type: userProfile.type };
    }
    this.state = {
      svgData: svgData
    };
  }

  getProfileTypeName = function(profileType) {
    switch (profileType) {
      case 'tpo': {
        return i18n.t('label.tpo_title');
      }
      case 'company': {
        return i18n.t('label.company_title');
      }
      case 'individual': {
        return i18n.t('label.individual_name');
      }
      case 'education': {
        return i18n.t('label.education');
      }
    }
  };
  componentWillReceiveProps(nextProps) {
    const { treecounterData, userProfile } = nextProps;
    if (treecounterData) {
      let svgData = { ...treecounterData, type: userProfile.type };
      this.setState({ svgData });
    }
  }

  render() {
    const { treecounterData, userProfile } = this.props;
    const profileType = userProfile
      ? this.getProfileTypeName(userProfile.type)
      : null;
    let { svgData } = this.state;

    return (
      <View style={styles.homeContainer}>
        {userProfile ? (
          <View>
            <View style={styles.userProfileContainer}>
              <View style={styles.profileImageContainer}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: getImageUrl('profile', 'thumb', userProfile.image)
                  }}
                />
              </View>

              <View style={styles.userInfo}>
                <View style={styles.userInfoName}>
                  <Text style={styles.nameStyle}>{userProfile.fullname}</Text>
                </View>
                <View style={styles.userInfoProfileType}>
                  <View style={styles.profileTypeContainer}>
                    <Text style={styles.profileTypeStyle}>{profileType}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.svgContainer}>
              <SvgContainer {...svgData} />>
            </View>
          </View>
        ) : (
          <LoadingIndicator />
        )}
      </View>
    );
  }
}

UserHome.propTypes = {
  treecounterData: PropTypes.object,
  userProfile: PropTypes.object
};

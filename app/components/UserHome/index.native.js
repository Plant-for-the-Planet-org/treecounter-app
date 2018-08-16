import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../actions/apiRouting';
import { View, Text, Image, ImageBackground } from 'react-native';
import styles from '../../styles/user-home';
import i18n from '../../locales/i18n';
import LoadingIndicator from '../Common/LoadingIndicator';
import PrimaryButton from '../Common/Button/PrimaryButton';
import SvgContainer from '../Common/SvgContainer';
import { getProfileTypeName } from '../PublicTreeCounter/utils';

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

  componentWillReceiveProps(nextProps) {
    const { treecounterData, userProfile } = nextProps;
    if (treecounterData) {
      let svgData = { ...treecounterData, type: userProfile.type };
      this.setState({ svgData });
    }
  }

  render() {
    const { treecounterData, userProfile } = this.props;
    const profileType = getProfileTypeName(userProfile.type);
    let { svgData } = this.state;

    return (
      <View>
        <View style={styles.header}>
          <View style={styles.userProfileContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: getImageUrl('profile', 'thumb', userProfile.image)
                }}
              />
              <View style={styles.circle} />
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
        </View>
        <View style={styles.svgContainer}>
          <SvgContainer {...svgData} />>
        </View>
      </View>
    );
  }
}

UserHome.propTypes = {
  treecounterData: PropTypes.object,
  userProfile: PropTypes.object
};

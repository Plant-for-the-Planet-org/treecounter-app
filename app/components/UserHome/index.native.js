import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../actions/apiRouting';
import { ScrollView, View, Text, Image } from 'react-native';
import styles from '../../styles/user-home';
import CardLayout from '../Common/Card';
import i18n from '../../locales/i18n';
import LoadingIndicator from '../Common/LoadingIndicator';
import PrimaryButton from '../Common/Button/PrimaryButton';
import SvgContainer from '../Common/SvgContainer';
import { getProfileTypeName } from '../PublicTreeCounter/utils';
import { ProfilePic } from '../../assets';

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
  updateSvg(toggle) {
    if (toggle) {
      const treecounter = this.props.treecounterData;
      let svgData = {
        id: treecounter.id,
        target: treecounter.countCommunity + treecounter.countPersonal, // light color
        planted: treecounter.countPersonal, //dark color
        community: treecounter.countCommunity,
        personal: treecounter.countPersonal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear,
        type: this.props.userProfile.type
      };
      this.setState({ svgData: Object.assign({}, svgData) });
    } else {
      const treecounter = this.props.treecounterData;
      let svgData = {
        id: treecounter.id,
        target: treecounter.countTarget,
        planted: treecounter.countPlanted,
        community: treecounter.countCommunity,
        personal: treecounter.countPersonal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear,
        type: this.props.userProfile.type
      };
      this.setState({ svgData: Object.assign({}, svgData) });
    }
  }

  render() {
    const { treecounterData, userProfile } = this.props;
    const profileType = getProfileTypeName(userProfile.type);
    let { svgData } = this.state;

    return (
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.userProfileContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileImage}
                source={
                  userProfile.image
                    ? {
                        uri: getImageUrl('profile', 'thumb', userProfile.image)
                      }
                    : ProfilePic
                }
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
          <SvgContainer
            {...svgData}
            onToggle={toggleVal => this.updateSvg(toggleVal)}
          />>
        </View>
        <View>
          {'tpo' === userProfile.type &&
          1 <=
            userProfile.plantProjects.length ? null : userProfile.synopsis1 || // /> //   onSelect={this.onPlantProjectSelected} //   {...tpoProps} // <TpoDonationPlantProjectSelector
          userProfile.synopsis2 ? (
            <CardLayout>
              <Text style={styles.footerText}>{userProfile.synopsis1}</Text>
            </CardLayout>
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

UserHome.propTypes = {
  treecounterData: PropTypes.object,
  userProfile: PropTypes.object
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, Image } from 'react-native';
import styles from '../../styles/user-home';
import CardLayout from '../Common/Card';
import SvgContainer from '../Common/SvgContainer';
import { getProfileTypeName } from '../PublicTreeCounter/utils';
import UserProfileImage from '../Common/UserProfileImage';
import scrollStyle from '../../styles/common/scrollStyle';

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
      if (isNaN(parseInt(treecounter.community))) {
        treecounter.community = 0;
      }
      if (isNaN(parseInt(treecounter.personal))) {
        treecounter.personal = 0;
      }
      let svgData = {
        id: treecounter.id,
        target: treecounter.community + treecounter.personal, // light color
        planted: treecounter.personal, //dark color
        community: treecounter.community,
        personal: treecounter.personal,
        targetComment: treecounter.targetComment,
        targetYear: treecounter.targetYear,
        type: this.props.userProfile.type
      };
      this.setState({ svgData: Object.assign({}, svgData) });
    } else {
      const treecounter = this.props.treecounterData;
      let svgData = {
        id: treecounter.id,
        target: treecounter.target,
        planted: treecounter.planted,
        community: treecounter.community,
        personal: treecounter.personal,
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
      <ScrollView
        contentContainerStyle={[{ flex: 1 }, scrollStyle.styleContainer]}
      >
        <View style={styles.header}>
          <View style={styles.userProfileContainer}>
            <UserProfileImage profileImage={userProfile.image} />

            <View style={styles.userInfo}>
              <View style={styles.userInfoName}>
                <Text style={styles.nameStyle}>
                  {userProfile.treecounter.displayName}
                </Text>
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

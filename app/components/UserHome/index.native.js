import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  Linking
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import styles from '../../styles/user-home';
import tabStyles from '../../styles/common/tabbar';

import CardLayout from '../Common/Card';
import SvgContainer from '../Common/SvgContainer';
import { getProfileTypeName } from '../PublicTreeCounter/utils';
import UserProfileImage from '../Common/UserProfileImage';
import ContributionCardList from '../UserContributions/ContributionCardList';

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};

export default class UserHome extends Component {
  constructor(props) {
    super(props);

    let svgData = {};
    const { treecounterData, userProfile } = props;
    if (treecounterData) {
      svgData = { ...treecounterData, type: userProfile.type };
    }
    this.state = {
      svgData: svgData,
      routes: [
        { key: 'home', title: 'Home' },
        { key: 'my-trees', title: 'My Trees' }
      ],
      index: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const { treecounterData, userProfile } = nextProps;
    if (treecounterData) {
      let svgData = { ...treecounterData, type: userProfile.type };
      this.setState({ svgData });
    }
  }

  _handleIndexChange = index => {
    this.setState({ index });
  };

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={tabStyles.indicator}
        style={tabStyles.tabBar}
        tabStyle={{ width: Layout.window.width / 2 }}
        labelStyle={tabStyles.textStyle}
        indicatorStyle={tabStyles.textActive}
        scrollEnabled
        bounces
        useNativeDriver
      />
    );
  };

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

  _renderUserHome = ({ route }) => {
    const { treecounterData, userProfile } = this.props;
    const profileType = getProfileTypeName(userProfile.type);
    let { svgData } = this.state;
    switch (route.key) {
      case 'home':
        return (
          <ScrollView>
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
              />
            </View>
            <View>
              {userProfile.synopsis1 || // /> //   onSelect={this.onPlantProjectSelected} //   {...tpoProps} // <TpoDonationPlantProjectSelector
              userProfile.synopsis2 ||
              userProfile.linkText ||
              userProfile.url ? (
                <CardLayout>
                  {userProfile.synopsis1 ? (
                    <Text style={styles.footerText}>
                      {userProfile.synopsis1}
                    </Text>
                  ) : null}
                  {userProfile.synopsis2 ? (
                    <Text style={styles.footerText}>
                      {userProfile.synopsis2}
                    </Text>
                  ) : null}
                  {userProfile.linkText ? (
                    <Text style={styles.footerText}>
                      {userProfile.linkText}
                    </Text>
                  ) : null}
                  {userProfile.url ? (
                    <Text
                      style={styles.linkText}
                      onPress={() => this._goToURL(userProfile.url)}
                    >
                      {userProfile.url}
                    </Text>
                  ) : null}
                </CardLayout>
              ) : null}
            </View>
            <View>
              {'tpo' === userProfile.type &&
              1 <= userProfile.plantProjects.length
                ? null
                : null}
            </View>
          </ScrollView>
        );
      case 'my-trees':
        return (
          <ScrollView>
            <ContributionCardList
              contributions={this.props.userContributions}
            />
          </ScrollView>
        );
      default:
        return null;
    }
  };

  _goToURL(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        //console.log("Don't know how to open URI: " + url);
      }
    });
  }

  render() {
    return (
      <TabView
        useNativeDriver
        navigationState={this.state}
        renderScene={this._renderUserHome}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

UserHome.propTypes = {
  treecounterData: PropTypes.object,
  userProfile: PropTypes.object,
  userProfileId: PropTypes.number.isRequired,
  userContributions: PropTypes.array.isRequired,
  navigation: PropTypes.any
};

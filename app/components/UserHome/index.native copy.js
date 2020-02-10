/* eslint-disable no-underscore-dangle */
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
import { TabView, TabBar } from 'react-native-tab-view';

import styles from '../../styles/user-home';
import tabStyles from '../../styles/common/tabbar';
import * as images from '../../assets';

import CardLayout from '../Common/Card';
import SvgContainer from '../Common/SvgContainer';
import UserProfileImage from '../Common/UserProfileImage';
import ContributionCardList from '../UserContributions/ContributionCardList';

import i18n from '../../locales/i18n';

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
        { key: 'home', title: i18n.t('label.home') },
        { key: 'my-trees', title: i18n.t('label.my_trees') }
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

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate =
      JSON.stringify(nextProps) !== JSON.stringify(this.props) ||
      nextState.index != this.state.index;
    return shouldUpdate;
  }

  _handleIndexChange = index => {
    this.setState({ index });
  };

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
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
    const { userProfile } = this.props;
    const profileType = userProfile.type;
    let { svgData } = this.state;
    switch (route.key) {
      case 'home':
        return (
          <ScrollView contentContainerStyle={{ paddingBottom: 72 }}>
            <View style={styles.header}>
              <View style={styles.userProfileContainer}>
                <UserProfileImage
                  imageStyle={styles.userProfileImage}
                  profileImage={userProfile.image}
                />

                <View style={styles.userInfo}>
                  <View style={styles.userInfoName}>
                    <Text style={styles.nameStyle}>
                      {userProfile.treecounter.displayName}
                    </Text>
                  </View>
                  <View style={styles.userInfoProfileType}>
                    <Image
                      style={styles.profileTypeImage}
                      resizeMode="contain"
                      source={
                        profileType === 'education'
                          ? images['schoolIcon']
                          : profileType === 'tpo'
                            ? images['tpoIcon']
                            : profileType === 'company'
                              ? images['companyIcon']
                              : images['individualIcon']
                      }
                    />
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
              {userProfile.synopsis1 ||
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
                  {userProfile.url ? (
                    <Text
                      style={styles.linkText}
                      onPress={() => this._goToURL(userProfile.url)}
                    >
                      {userProfile.linkText || i18n.t('label.read_more')}
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
          <ScrollView contentContainerStyle={{ paddingBottom: 72 }}>
            <ContributionCardList
              contributions={this.props.userContributions}
              deleteContribution={this.props.deleteContribution}
            />
          </ScrollView>
        );
      default:
        return null;
    }
  };

  _goToURL(url) {
    /*
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        //console.log("Don't know how to open URI: " + url);
      }
    });
*/
    Linking.openURL(url).catch(err => console.log('Cannot open URI', err));
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
  deleteContribution: PropTypes.func,
  navigation: PropTypes.any
};

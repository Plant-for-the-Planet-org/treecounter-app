import React, { Component } from 'react';

import { Image, View, TouchableOpacity, BackHandler } from 'react-native';

import { getLocalRoute } from '../../actions/apiRouting';
import { context } from '../../config';
import { allowedUrls } from '../../config/socialShare';
import {
  newSearchIcon,
  // iosNotificationWhite,
  shareIcon
} from '../../assets';
import { Share } from 'react-native';

export default class HeaderRight extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    const { navigation } = this.props;
    if (navigation.state.routeName === 'Tab') {
      BackHandler.exitApp();
      return null;
    }
    this.props.navigation.goBack();
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  renderShareButtons(userProfile) {
    let { state } = this.props.navigation;
    let pathname = state['index']
      ? state.routes[state.index].routeName
      : state.routeName;
    if (
      allowedUrls.filter(url => pathname.split('/').includes(url)).length > 0
    ) {
      let redirectPath = '';
      if (pathname.split('/').includes('home')) {
        redirectPath =
          context.scheme +
          '://' +
          context.host +
          getLocalRoute('app_treecounter', {
            treecounter: userProfile.treecounter.slug
          });
      } else {
        if (pathname === '/t') {
          redirectPath =
            context.scheme +
            '://' +
            context.host +
            getLocalRoute('app_treecounter', {
              treecounter: state.routes[state.index].params.treeCounterId
            });
        } else if (pathname === '/competition') {
          // eslint-disable-next-line no-prototype-builtins
          const competition = state.hasOwnProperty('params')
            ? state.params.competition
            : // eslint-disable-next-line no-prototype-builtins
            state.hasOwnProperty('routes')
            ? state.routes[state.index].params.competition
            : -1;
          redirectPath =
            context.scheme +
            '://' +
            context.host +
            getLocalRoute('app_competition', {
              competition
            });
        } else {
          redirectPath = context.scheme + '://' + context.host + pathname;
        }
      }
      return (
        <TouchableOpacity
          style={{ height: 35, width: 35, padding: 5, marginRight: 15 }}
          onPress={() => this.handleShare(redirectPath)}
        >
          <Image source={shareIcon} style={{ height: 25, width: 25 }} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  handleShare(redirectPath) {
    Share.share({
      message: redirectPath
    });
  }
  render() {
    const {
      navigation
      // userProfile,
      // isLoggedIn
    } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          style={{ height: 35, width: 35, padding: 5, top: 12 }}
          onPress={() => navigation.navigate('Search')}
        >
          <Image source={newSearchIcon} style={{ height: 25, width: 25 }} />
        </TouchableOpacity>
        {/* {userProfile ? (() => this.renderShareButtons(userProfile))() : null} */}
        {/* {isLoggedIn ? (
          <TouchableOpacity>
            <Image
              source={iosNotificationWhite}
              style={{ height: 25, width: 25, marginRight: 20 }}
            />
          </TouchableOpacity>
        ) : null} */}
      </View>
    );
  }
}

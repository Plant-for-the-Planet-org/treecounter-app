import React, { Component } from 'react';

import {
  Image,
  View,
  TouchableOpacity,
  BackHandler,
  NavigationActions
} from 'react-native';

import { getLocalRoute } from '../../actions/apiRouting';
import { context } from '../../config';
import { allowedUrls } from '../../config/socialShare';
import {
  notificationBlack,
  blackSearchIcon,
  blackShareIcon
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
    let pathname = state.hasOwnProperty('index')
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
          const competition = state.hasOwnProperty('params')
            ? state.params.competition
            : state.hasOwnProperty('routes')
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
          style={{ height: 35, width: 35, padding: 5 }}
          onPress={() => this.handleShare(redirectPath)}
        >
          <Image source={blackShareIcon} style={{ height: 24, width: 24 }} />
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
    const { navigation, userProfile, isLoggedIn } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12
        }}
      >
        {userProfile ? (() => this.renderShareButtons(userProfile))() : null}
        <TouchableOpacity
          style={{ height: 35, width: 35, padding: 5 }}
          onPress={() => navigation.navigate('Search')}
        >
          <Image source={blackSearchIcon} style={{ height: 24, width: 24 }} />
        </TouchableOpacity>

        {isLoggedIn ? (
          <TouchableOpacity>
            <Image
              source={notificationBlack}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

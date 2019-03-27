import React, { Component } from 'react';

import { Image, View, TouchableOpacity } from 'react-native';

import { getLocalRoute } from '../../actions/apiRouting';
import { context } from '../../config';
import { allowedUrls } from '../../config/socialShare';
import { iosSearchWhite, iosNotificationWhite, shareIcon } from '../../assets';
import { Share } from 'react-native';

export default (HeaderRight = function(navigation, userProfile, isLoggedIn) {
  function handleShare(redirectPath) {
    console.log(navigation.state);
    Share.share({
      url: redirectPath
    });
  }

  function renderShareButtons() {
    let { state } = navigation;
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
        redirectPath = context.scheme + '://' + context.host + pathname;
      }
      return (
        <TouchableOpacity onPress={() => handleShare(redirectPath)}>
          <Image
            source={shareIcon}
            style={{ height: 25, width: 25, marginRight: 20 }}
          />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Image
          source={iosSearchWhite}
          style={{ height: 25, width: 25, marginRight: 20 }}
        />
      </TouchableOpacity>
      {(() => renderShareButtons())()}
      {isLoggedIn ? (
        <TouchableOpacity>
          <Image
            source={iosNotificationWhite}
            style={{ height: 25, width: 25, marginRight: 20 }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
});

import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Image, ImageBackground } from 'react-native';
import FollowLabelButton from '../Common/Button/FollowLabelButton';
import userHomeStyles from '../../styles/user-home';

const TreecounterHeader = ({
  caption,
  profileType,
  logo,
  isUserFollower,
  isUserLoggedIn,
  showFollow,
  followChanged
}) => {
  return (
    <View style={userHomeStyles.userProfileContainer}>
      <View style={userHomeStyles.profileImageContainer}>
        <Image style={userHomeStyles.profileImage} source={logo} />
        <View style={userHomeStyles.circle} />
      </View>

      <View style={userHomeStyles.userInfo}>
        <View style={userHomeStyles.userInfoName}>
          <Text style={userHomeStyles.nameStyle}>{caption}</Text>
        </View>
        <View style={userHomeStyles.userInfoProfileType}>
          <View style={userHomeStyles.profileTypeContainer}>
            <Text style={userHomeStyles.profileTypeStyle}>{profileType}</Text>
          </View>
          {showFollow && (
            <FollowLabelButton
              isSubscribed={isUserFollower}
              isLoggedIn={isUserLoggedIn}
              onClick={() => followChanged()}
            />
          )}
        </View>
      </View>
    </View>
  );
};

TreecounterHeader.propTypes = {
  caption: PropTypes.string.isRequired,
  profileType: PropTypes.string.isRequired,
  logo: PropTypes.string,
  isUserFollower: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  showFollow: PropTypes.bool.isRequired,
  followChanged: PropTypes.func.isRequired
};

export default TreecounterHeader;

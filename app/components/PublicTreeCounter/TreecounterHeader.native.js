import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';

import FollowLabelButton from '../Common/Button/FollowLabelButton';
import userHomeStyles from '../../styles/user-home.native';
import UserProfileImage from '../Common/UserProfileImage';

import * as images from '../../assets';

const TreecounterHeader = ({
  caption,
  profileType,
  logo,
  isUserFollowerBool,
  /* isUserLoggedIn, */
  showFollow,
  followChanged,
  containerStyle
}) => {
  return (
    <View style={[userHomeStyles.userProfileContainer, containerStyle]}>
      <UserProfileImage
        imageStyle={userHomeStyles.userProfileImage}
        profileImage={logo}
      />
      <View style={userHomeStyles.userInfo}>
        <View style={userHomeStyles.userInfoName}>
          <Text style={userHomeStyles.nameStyle}>{caption}</Text>
        </View>
        <View style={userHomeStyles.userInfoProfileType}>
          {/* {showFollow ? (
            <FollowLabelButton
              isSubscribed={isUserFollowerBool}
              onClick={() => followChanged()}
            />
          ) : null} */}
        </View>
      </View>
    </View>
  );
};

TreecounterHeader.propTypes = {
  caption: PropTypes.string.isRequired,
  profileType: PropTypes.string,
  logo: PropTypes.string,
  isUserFollowerBool: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  showFollow: PropTypes.bool.isRequired,
  followChanged: PropTypes.func.isRequired,
  containerStyle: PropTypes.object
};

export default TreecounterHeader;

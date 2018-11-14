import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';

import { getImageUrl } from '../../actions/apiRouting';
import FollowLabelButton from '../Common/Button/FollowLabelButton';
import userHomeStyles from '../../styles/user-home.native';
import UserProfileImage from '../Common/UserProfileImage';
const TreecounterHeader = ({
  caption,
  profileType,
  logo,
  isUserFollowerBool,
  isUserLoggedIn,
  showFollow,
  followChanged,
  containerStyle
}) => {
  return (
    <View style={[userHomeStyles.userProfileContainer, containerStyle]}>
      <UserProfileImage profileImage={logo} />
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
              isSubscribed={isUserFollowerBool}
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
  isUserFollowerBool: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  showFollow: PropTypes.bool.isRequired,
  followChanged: PropTypes.func.isRequired,
  containerStyle: PropTypes.object
};

export default TreecounterHeader;

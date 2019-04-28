import React from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../actions/apiRouting';
import { ProfilePic } from '../../assets';
import { View, Image } from 'react-native';
import styles from '../../styles/user-home.native';

const UserProfileImage = ({ profileImage, style, imageStyle }) => {
  return (
    <View style={[styles.profileImageContainer, style]}>
      <Image
        style={[styles.profileImage, imageStyle]}
        resizeMode="contain"
        source={
          profileImage
            ? {
                uri: !profileImage.includes('base64')
                  ? getImageUrl('profile', 'thumb', profileImage)
                  : profileImage
              }
            : ProfilePic
        }
      />
      <View style={[styles.circle, style]} />
    </View>
  );
};

UserProfileImage.propTypes = {
  profileImage: PropTypes.string
};

export default UserProfileImage;

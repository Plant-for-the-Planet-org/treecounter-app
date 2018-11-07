import React from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../actions/apiRouting';
import { ProfilePic } from '../../assets';
import { View, Image } from 'react-native';
import styles from '../../styles/user-home.native';

const UserProfileImage = ({ profileImage }) => {
  return (
    <View style={styles.profileImageContainer}>
      <Image
        style={styles.profileImage}
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
      <View style={styles.circle} />
    </View>
  );
};

UserProfileImage.propTypes = {
  profileImage: PropTypes.string
};

export default UserProfileImage;

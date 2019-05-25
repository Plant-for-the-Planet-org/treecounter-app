import React from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../actions/apiRouting';
import { ProfilePic } from '../../assets';
import { View, Image } from 'react-native';
import styles from '../../styles/user-home.native';
import { profileTypeToImage } from '../../helpers/utils';

const UserProfileImage = ({
  profileImage,
  style,
  imageStyle,
  imageCategory,
  imageType,
  defaultType
}) => {
  let imageCat = imageCategory ? imageCategory : 'profile';
  let imageTyp = imageType ? imageType : 'thumb';
  let defaultImage = defaultType ? profileTypeToImage[defaultType] : ProfilePic;
  return (
    <View style={[styles.profileImageContainer, style]}>
      <Image
        style={[styles.profileImage, imageStyle]}
        source={
          profileImage
            ? {
                uri: !profileImage.includes('base64')
                  ? getImageUrl(imageCat, imageTyp, profileImage)
                  : profileImage
              }
            : defaultImage
        }
      />
      {/*<View style={[styles.circle, style]} />*/}
    </View>
  );
};

UserProfileImage.propTypes = {
  profileImage: PropTypes.string
};

export default UserProfileImage;

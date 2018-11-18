import React, { Component } from 'react';
import TouchableItem from '../../components/Common/TouchableItem';
import { Image } from 'react-native';
import { getImageUrl } from '../../actions/apiRouting';
import { ProfilePic } from '../../assets';
import styles from '../../styles/menu';

export default (BurgerMenu = function(navigation, userProfile) {
  return (
    <TouchableItem
      onPress={() => {
        navigation.openDrawer();
      }}
    >
      <Image
        style={styles.burgerMenuImageStyle}
        source={
          userProfile && userProfile.image
            ? {
                uri: getImageUrl('profile', 'thumb', userProfile.image)
              }
            : ProfilePic
        }
      />
    </TouchableItem>
  );
});

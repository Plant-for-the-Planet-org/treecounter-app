import React from 'react';
import { View, Text } from 'react-native';
import buttonStyles from '../../../styles/common/button';

import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n';

const FollowLabelButton = ({ isLoggedIn, isSubscribed, onClick }) => {
  const label = isSubscribed
    ? i18n.t('label.un_subscribe')
    : i18n.t('label.subscribe');

  return (
    <View
      style={
        isLoggedIn && isSubscribed
          ? buttonStyles.followingButton
          : buttonStyles.followButton
      }
      onClick={() => onClick()}
    >
      {label}
    </View>
  );
};

FollowLabelButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  isSubscribed: PropTypes.bool,
  isLoggedIn: PropTypes.bool
};

export default FollowLabelButton;

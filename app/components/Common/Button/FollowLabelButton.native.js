import React, { lazy } from 'react';
import { View, Text } from 'react-native';
import buttonStyles from '../../../styles/common/button';

const TouchableItem = lazy(() => import('../TouchableItem'));

import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n';

const FollowLabelButton = ({
  /* isLoggedIn, */
  isSubscribed,
  onClick,
  label = undefined
}) => {
  label =
    label ||
    (isSubscribed ? i18n.t('label.unsubscribe') : i18n.t('label.subscribe'));

  return (
    <TouchableItem
      activeOpacity={0.6}
      onPress={() => onClick()}
      style={
        isSubscribed ? buttonStyles.followingButton : buttonStyles.followButton
      }
    >
      <View>
        <Text style={buttonStyles.followButtonText}>{label}</Text>
      </View>
    </TouchableItem>
  );
};

FollowLabelButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  isSubscribed: PropTypes.bool,
  isLoggedIn: PropTypes.bool
};

export default FollowLabelButton;

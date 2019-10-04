import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';
import styles from '../../styles/common/_seemore_toggle';
import { View, Text } from 'react-native';
const SeeMoreToggle = ({ seeMore, onToggle /* , style */ }) => {
  return (
    <View style={seeMore ? styles.collapsed : styles.expanded}>
      <Text
        style={seeMore ? styles.collapsedText : styles.expandedText}
        onPress={() => onToggle()}
      >
        {seeMore ? '+ ' + i18n.t('label.see_more') : i18n.t('label.see_less')}
      </Text>
    </View>
  );
};

SeeMoreToggle.propTypes = {
  seeMore: PropTypes.bool,
  onToggle: PropTypes.func
};

export default SeeMoreToggle;

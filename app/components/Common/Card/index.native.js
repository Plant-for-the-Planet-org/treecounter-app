import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/common/card';
import TouchableItem from '../../Common/TouchableItem.native';

const CardLayout = ({ children, style, onPress, withoutShadow }) => (
  <TouchableItem
    style={[
      withoutShadow ? styles.cardContainerWithoutShaow : styles.cardContainer,
      style
    ]}
    onPress={onPress}
  >
    {children}
  </TouchableItem>
);

CardLayout.propTypes = {
  children: PropTypes.node,
  style: PropTypes.any,
  withoutShadow: PropTypes.any
};

export default CardLayout;

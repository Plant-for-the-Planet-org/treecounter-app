import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/common/card';

const TouchableItem = lazy(() => import('../../Common/TouchableItem.native'));

const CardLayout = ({ children, style, onPress }) => (
  <TouchableItem style={[styles.cardContainer, style]} onPress={onPress}>
    {children}
  </TouchableItem>
);

CardLayout.propTypes = {
  children: PropTypes.node,
  style: PropTypes.any
};

export default CardLayout;

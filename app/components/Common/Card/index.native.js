import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from '../../../styles/common/card';
import TouchableItem from '../../Common/TouchableItem.native';

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

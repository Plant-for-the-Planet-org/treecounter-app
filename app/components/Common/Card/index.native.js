import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/common/card';

const TouchableItem = lazy(() => import('../../Common/TouchableItem.native'));

const CardLayout = ({ children, style, onPress, withoutShadow }) => (
  <TouchableItem
    style={[
      style,
      withoutShadow ? styles.cardContainerWithoutShadow : styles.cardContainer
    ]}
    onPress={onPress}
  >
    {children}
  </TouchableItem>
);

export const CardLayoutCompetition = ({ children, style, onPress }) => (
  <TouchableItem
    style={[style, styles.competitionCardContainer]}
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

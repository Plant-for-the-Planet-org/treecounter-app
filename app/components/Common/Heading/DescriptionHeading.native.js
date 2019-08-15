import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from '../../../styles/common/headingStyles';

const DescriptionHeading = ({ children }) => (
  <Text style={styles.pftp_description_heading}>{children}</Text>
);

DescriptionHeading.propTypes = {
  children: PropTypes.node
};

export default DescriptionHeading;

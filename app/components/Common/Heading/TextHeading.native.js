import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from '../../../styles/common/headingStyles';

const TextHeading = ({ children }) => (
  <Text style={styles.pftp_text_heading}>{children}</Text>
);

TextHeading.propTypes = {
  children: PropTypes.node
};

export default TextHeading;

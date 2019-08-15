import React from 'react';
import PropTypes from 'prop-types';

const DescriptionHeading = ({ children }) => (
  <p className="pftp-description-heading">{children}</p>
);

DescriptionHeading.propTypes = {
  children: PropTypes.node
};

export default DescriptionHeading;

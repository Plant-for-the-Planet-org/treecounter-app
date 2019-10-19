import React from 'react';
import PropTypes from 'prop-types';

const DescriptionHeading = ({ children, align }) => (
  <p className={`pftp-description-heading ${align}`}>{children}</p>
);

DescriptionHeading.propTypes = {
  children: PropTypes.node,
  align: PropTypes.string
};

export default DescriptionHeading;

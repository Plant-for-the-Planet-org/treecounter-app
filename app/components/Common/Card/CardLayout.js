import React from 'react';
import PropTypes from 'prop-types';

const CardLayout = ({ children }) => (
  <div className="pftp-card-layout">{children}</div>
);

CardLayout.propTypes = {
  children: PropTypes.array
};

export default CardLayout;

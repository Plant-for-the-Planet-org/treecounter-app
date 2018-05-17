import React from 'react';
import PropTypes from 'prop-types';

const CardLayout = ({ children }) => (
  <div className="pftp-card-layout">{children}</div>
);

CardLayout.propTypes = {
  children: PropTypes.element
};

export default CardLayout;

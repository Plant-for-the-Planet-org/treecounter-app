import React from 'react';
import PropTypes from 'prop-types';

const TransparentButton = ({ onClick, children }) => (
  <a className="pftp-button-transparent" onClick={() => onClick()}>
    {children}
  </a>
);

TransparentButton.propTypes = {
  children: PropTypes.array,
  onClick: PropTypes.func
};

export default TransparentButton;

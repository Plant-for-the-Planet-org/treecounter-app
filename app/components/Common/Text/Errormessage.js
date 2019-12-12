import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
const Errormessage = ({ children, strong }) => (
  <div className={'error-msg-checked'}>{children} </div>
);

Errormessage.propTypes = {
  children: PropTypes.node,
  strong: PropTypes.bool
};

export default Errormessage;

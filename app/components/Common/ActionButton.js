import React from 'react';
import PropTypes from 'prop-types';

const ActionButton = props => (
  <button className="navigate-button" href="" {...props}>
    {props.caption}
  </button>
);

ActionButton.propTypes = {
  caption: PropTypes.string.isRequired
};

export default ActionButton;

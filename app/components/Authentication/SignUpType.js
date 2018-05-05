import React, { Component } from 'react';
import * as join from '../../constants/strings';
import PropTypes from 'prop-types';

const SignUpType = props => {
  const { type, style, profiletype, profile } = props;

  return (
    <div
      className="col-xs-4 col-sm-3 col-lg-2"
      onClick={() => profile(`${type}`)}
    >
      <div className={`${style}` + (profiletype == type ? 'selected' : '')} />
      <div className="flex-column red">
        <span className="border-bottom">{join.iamlabel}</span>
        <span className="strong">{join[type]}</span>
      </div>
    </div>
  );
};

SignUpType.propTypes = {
  type: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  profiletype: PropTypes.string.isRequired,
  profile: PropTypes.func.isRequired
};

export default SignUpType;

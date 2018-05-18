import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as join from '../../constants/strings';

export default class SignUpType extends Component {
  render() {
    let { type, style, profiletype, profile } = this.props;
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
  }
}

SignUpType.propTypes = {
  type: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  profiletype: PropTypes.string.isRequired,
  profile: PropTypes.func.isRequired
};

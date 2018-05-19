import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextSpan from '../../Common/Text/TextSpan';

export default class SignUpType extends Component {
  render() {
    const { active, imgSrc, salutation, title } = this.props;
    return (
      <div className={'signup-type ' + (active ? 'active' : '')}>
        <img src={imgSrc} />
        <div className="signup-type__text">
          <TextSpan>{salutation}</TextSpan>
          <hr />
          <TextSpan strong={true}>{title}</TextSpan>
        </div>
      </div>
    );
  }
}

SignUpType.propTypes = {
  active: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired,
  salutation: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SignUpType extends Component {
  render() {
    const { active, imgSrc, salutation, title } = this.props;
    return (
      <div className={'signup-type ' + (active ? 'active' : '')}>
        <img src={imgSrc} />>
        <div className="signup-type__text">
          <span className="signup-type__text--salutation">{salutation}</span>
          <hr />
          <span className="signup-type__text--title">{title}</span>
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

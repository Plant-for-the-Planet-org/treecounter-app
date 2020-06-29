import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextSpan from '../../Common/Text/TextSpan';

export default class SignUpType extends Component {
  constructor() {
    super();
    this.OnProfileClick = this.OnProfileClick.bind(this);
  }

  OnProfileClick() {
    this.props.onProfileClick && this.props.onProfileClick(this.props.type);
  }

  render() {
    const { active, imgSrc, salutation, title } = this.props;
    return (
      <div
        className={'signup-type ' + (active ? 'active' : '')}
        onClick={this.OnProfileClick}
      >
        <div className="signupTypeImage">
          <img src={imgSrc} />
        </div>

        <div className="signup-type__text">
          <TextSpan>{salutation}</TextSpan>
          <hr />
          <TextSpan strong>{title}</TextSpan>
        </div>
      </div>
    );
  }
}

SignUpType.propTypes = {
  active: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired,
  salutation: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onProfileClick: PropTypes.func
};

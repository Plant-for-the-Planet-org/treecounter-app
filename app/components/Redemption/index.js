import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import {
  redemptionFormSchema,
  schemaOptions
} from '../../server/parsedSchemas/redemption';

import LoadingIndicator from '../Common/LoadingIndicator';
import PrimaryButton from '../Common/Button/PrimaryButton';
import TextHeading from '../Common/Heading/TextHeading';
import TextBlock from '../Common/Text/TextBlock';
import CardLayout from '../Common/Card';
import i18n from '../../locales/i18n.js';
import DescriptionHeading from '../Common/Heading/DescriptionHeading';
import { redeemSignIn, redeemRed, redeemGreen } from '../../assets';

let TCombForm = t.form.Form;

export default class Redemption extends Component {
  constructor(props) {
    super(props);
  }
  onSetRedemption() {
    let value = this.refs.redemptionForm.getValue();
    if (value) {
      this.props.setRedemptionCode(value);
    }
  }
  onValidationCode() {
    let value = this.refs.redemptionForm.getValue();
    if (value) {
      this.props.validateCode(value);
    }
  }
  render() {
    const { code, updateRoute } = this.props;
    let content,
      button,
      icon,
      errorText,
      successText,
      actionText,
      statusText,
      form;
    errorText = this.props.errorText ? (
      <div className="pftp-description-heading">{this.props.errorText}</div>
    ) : null;
    successText = this.props.successText ? (
      <div className="pftp-description-heading">{this.props.successText}</div>
    ) : null;
    actionText = this.props.actionText ? (
      <div className="pftp-description-heading">{this.props.actionText}</div>
    ) : null;
    statusText = this.props.statusText ? (
      <div className="pftp-description-heading">{this.props.statusText}</div>
    ) : null;
    content = (
      <div>
        {actionText}
        {errorText}
        {successText}
        {statusText}
      </div>
    );
    if (
      this.props.pageStatus === 'code-validated' &&
      this.props.codeStatus === 'error'
    ) {
      button = (
        <div className="row">
          <PrimaryButton onClick={() => this.onValidationCode()}>
            {i18n.t('label.validate_code')}
          </PrimaryButton>
        </div>
      );
      icon = redeemRed;
    } else if (this.props.pageStatus === 'code-unknown') {
      button = (
        <div className="row">
          <PrimaryButton onClick={() => this.onValidationCode()}>
            {i18n.t('label.validate_code')}
          </PrimaryButton>
        </div>
      );
      icon = redeemGreen;
    } else if (this.props.pageStatus === 'not-logged-in') {
      button = (
        <div className="redemption-form">
          <div className="row">
            <PrimaryButton className="half" onClick={this.props.loginButton}>
              {i18n.t('label.login')}
            </PrimaryButton>
            <PrimaryButton className="half" onClick={this.props.signupButton}>
              {i18n.t('label.signUp')}
            </PrimaryButton>
          </div>
        </div>
      );
      icon = redeemSignIn;
    } else {
      button = (
        <div className="row">
          <PrimaryButton onClick={() => this.onSetRedemption()}>
            {this.props.buttonText}
          </PrimaryButton>
        </div>
      );
      icon = redeemGreen;
    }

    if (this.props.pageStatus !== 'success') {
      form = (
        <TCombForm
          ref="redemptionForm"
          type={redemptionFormSchema}
          options={schemaOptions}
          value={value}
        />
      );
    } else {
      form = null;
      button = null;
    }
    let value = { code: this.props.code };
    let heading;
    if (this.props.path === 'redeem') {
      heading = i18n.t('label.redeem_trees');
    } else if (this.props.path === 'claim') {
      heading = i18n.t('label.claim_trees');
    }
    return this.props.loading ? (
      <div className="sidenav-wrapper">
        <LoadingIndicator />
      </div>
    ) : (
      <div className="app-container__content--center sidenav-wrapper redemption_container">
        <TextHeading>
          {heading}
          <DescriptionHeading>
            {i18n.t('label.redeem_heading')}
          </DescriptionHeading>
        </TextHeading>
        <CardLayout className="redeem_card_layout">
          <div className="imageContainerRedeem">
            <img src={icon} />
          </div>
          {content}
          {form}
          {button}
        </CardLayout>
      </div>
    );
  }
}

Redemption.propTypes = {
  pageStatus: PropTypes.string,
  code: PropTypes.string,
  isLoggedIn: PropTypes.func,
  updateRoute: PropTypes.func,
  setRedemptionCode: PropTypes.func,
  validateCode: PropTypes.func,
  loginButton: PropTypes.func,
  signupButton: PropTypes.func,
  path: PropTypes.string,
  loading: PropTypes.boolean,
  codeStatus: PropTypes.string,
  statusText: PropTypes.string,
  successText: PropTypes.string,
  errorText: PropTypes.string,
  actionText: PropTypes.string,
  buttonText: PropTypes.string,
  tpos: PropTypes.array
};

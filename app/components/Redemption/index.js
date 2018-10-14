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

let TCombForm = t.form.Form;

export default class Redemption extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const { code, updateRoute } = this.props;
    let content, button;
    content = (
      <div>
        <div className="no-contribution-wrapper">{this.props.action_text}</div>
        <div className="no-contribution-wrapper">{this.props.error_text}</div>
        <div className="no-contribution-wrapper">{this.props.success_text}</div>
        <div className="no-contribution-wrapper">{this.props.status_text}</div>
      </div>
    );
    if (
      this.props.page_status === 'code-validated' &&
      this.props.code_status === 'error'
    ) {
      button = (
        <div className="row">
          <PrimaryButton onClick={this.props.validateCode}>
            {i18n.t('label.validate_code')}
          </PrimaryButton>
        </div>
      );
    } else if (this.props.page_status === 'code-unknown') {
      button = (
        <div className="row">
          <PrimaryButton onClick={this.props.validateCode}>
            {i18n.t('label.validate_code')}
          </PrimaryButton>
        </div>
      );
    } else if (this.props.page_status === 'not-logged-in') {
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
    } else {
      button = (
        <div className="row">
          <PrimaryButton onClick={this.props.setRedemptionCode}>
            {this.props.button_text}
          </PrimaryButton>
        </div>
      );
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
          <TextBlock>{i18n.t('label.trillionTreeMessage1')}</TextBlock>
        </TextHeading>
        <CardLayout>
          {content}
          <TCombForm
            ref="redemptionForm"
            type={redemptionFormSchema}
            options={schemaOptions}
            value={value}
          />
          {button}
        </CardLayout>
      </div>
    );
  }
}

Redemption.propTypes = {
  page_status: PropTypes.string,
  code: PropTypes.string,
  isLoggedIn: PropTypes.func,
  updateRoute: PropTypes.func,
  setRedemptionCode: PropTypes.func,
  validateCode: PropTypes.func,
  loginButton: PropTypes.func,
  signupButton: PropTypes.func,
  path: PropTypes.string,
  loading: PropTypes.boolean,
  code_status: PropTypes.string,
  status_text: PropTypes.string,
  success_text: PropTypes.string,
  error_text: PropTypes.string,
  action_text: PropTypes.string,
  button_text: PropTypes.string,
  tpos: PropTypes.func
};

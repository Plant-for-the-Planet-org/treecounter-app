import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import {
  redemptionFormSchema,
  schemaOptions
} from '../../server/parsedSchemas/redemption';

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
    const flag = this.props.isLoggedIn ? true : false;
    let content, button;
    if (code === null || code === undefined) {
      content = (
        <div className="no-contribution-wrapper">
          {i18n.t('label.enter_code')}
        </div>
      );
      button = (
        <div className="row">
          <PrimaryButton onClick={this.props.validateCode}>
            {i18n.t('label.validate_code')}
          </PrimaryButton>
        </div>
      );
    } else {
      if (!flag) {
        content = (
          <div className="no-contribution-wrapper">
            {i18n.t('label.log_in')}
          </div>
        );
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
              {i18n.t('label.redeem_code')}
            </PrimaryButton>
          </div>
        );
      }
    }
    let value = { code: this.props.code };
    let heading;
    if (this.props.path === 'redeem') {
      heading = i18n.t('label.redeem_trees');
    } else if (this.props.path === 'claim') {
      heading = i18n.t('label.claim_trees');
    }
    return (
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
  validateCodeInfo: PropTypes.func,
  code: PropTypes.string,
  isLoggedIn: PropTypes.func,
  updateRoute: PropTypes.func,
  setRedemptionCode: PropTypes.func,
  validateCode: PropTypes.func,
  loginButton: PropTypes.func,
  signupButton: PropTypes.func,
  path: PropTypes.string
};

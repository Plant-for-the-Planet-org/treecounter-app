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
    let content, button;
    content = (
      <div>
        <div className="no-contribution-wrapper">{this.props.actionText}</div>
        <div className="no-contribution-wrapper">{this.props.errorText}</div>
        <div className="no-contribution-wrapper">{this.props.successText}</div>
        <div className="no-contribution-wrapper">{this.props.statusText}</div>
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
    } else if (this.props.pageStatus === 'code-unknown') {
      button = (
        <div className="row">
          <PrimaryButton onClick={() => this.onValidationCode()}>
            {i18n.t('label.validate_code')}
          </PrimaryButton>
        </div>
      );
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
    } else {
      button = (
        <div className="row">
          <PrimaryButton onClick={() => this.onSetRedemption()}>
            {this.props.buttonText}
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
          {/*<div className="events_row">*/}
          {/*{this.props.tpos*/}
          {/*.map(element => (*/}
          {/*<div>*/}
          {/*<div className="imgContainer">*/}
          {/*<img src={getImageUrl('event', 'thumb', element.icon)} />*/}
          {/*</div>*/}

          {/*<TextBlock>{element.name}</TextBlock>*/}
          {/*</div>*/}
          {/*))}*/}
          {/*</div>*/}
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

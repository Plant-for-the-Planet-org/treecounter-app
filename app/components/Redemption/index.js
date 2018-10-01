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

const formLayout = locals => {
  return (
    <div className="target-form">
      <div className="row">
        <div>hey</div>
      </div>
    </div>
  );
};

// const allSchemaOptions = {
//   template: formLayout,
//   ...schemaOptions
// };

export default class Redemption extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const {
      page_status,
      code,
      isLoggedIn,
      updateRoute,
      validateCode
    } = this.props;
    let content, button;
    if (code === null || code === undefined) {
      content = (
        <div className="no-contribution-wrapper">
          {i18n.t('label.enter_code')}
        </div>
      );
      button = (
        <div className="row">
          <PrimaryButton onClick={validateCode(code)}>
            {i18n.t('label.validate_code')}
          </PrimaryButton>
        </div>
      );
    } else {
      if (!isLoggedIn) {
        content = (
          <div className="no-contribution-wrapper">
            {i18n.t('label.log_in')}
          </div>
        );
        button = (
          <div className="redemption-form">
            <div className="row">
              <PrimaryButton
                className="half"
                onClick={updateRoute.bind(this, 'app_login')}
              >
                {i18n.t('label.login')}
              </PrimaryButton>
              <PrimaryButton
                className="half"
                onClick={updateRoute.bind(this, 'app_signup')}
              >
                {i18n.t('label.signUp')}
              </PrimaryButton>
            </div>
          </div>
        );
      }
    }
    return (
      <div className="app-container__content--center sidenav-wrapper redemption_container">
        <TextHeading>
          {i18n.t('label.redeem_trees')}
          <TextBlock>{i18n.t('label.trillionTreeMessage1')}</TextBlock>
        </TextHeading>
        <CardLayout>
          {content}
          <TCombForm
            ref="redemptionForm"
            type={redemptionFormSchema}
            options={schemaOptions}
            value={this.props.code}
          />
          {button}
        </CardLayout>
      </div>
    );
  }
}

Redemption.propTypes = {
  page_status: PropTypes.string,
  code_info: PropTypes.object,
  codeStatus: PropTypes.object,
  code: PropTypes.string,
  isLoggedIn: PropTypes.boolean,
  updateRoute: PropTypes.func,
  setRedemptionCode: PropTypes.func,
  validateCode: PropTypes.func
};

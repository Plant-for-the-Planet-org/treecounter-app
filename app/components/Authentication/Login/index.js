import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import {
  loginFormSchema,
  schemaOptions
} from '../../../server/parsedSchemas/login';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card/CardLayout';
import LoginFooter from './LoginFooter';
import i18n from '../../../locales/i18n.js';

let TCombForm = t.form.Form;

export default class Login extends Component {
  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{i18n.t('label.login')}</TextHeading>
        <CardLayout>
          <TCombForm
            ref="loginForm"
            type={loginFormSchema}
            options={schemaOptions}
          />
          <PrimaryButton onClick={this.props.onPress}>
            {i18n.t('label.login')}
          </PrimaryButton>
          <LoginFooter />
        </CardLayout>
      </div>
    );
  }
}

Login.propTypes = {
  onPress: PropTypes.func.isRequired
};

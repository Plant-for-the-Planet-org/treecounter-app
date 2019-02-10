import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import { ReCaptcha, loadReCaptcha } from 'recaptcha-v3-react';
import uuid from 'uuidv4';

import { loginFormSchema } from '../../../server/parsedSchemas/login';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card';
import LoginFooter from './LoginFooter';
import i18n from '../../../locales/i18n.js';

let TCombForm = t.form.Form;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recaptchaToken: null
    };
  }

  componentDidMount() {
    loadReCaptcha({
      key: '6Ldl8WoUAAAAAGj0OIKqbvkm_XiDPbve07JJySBF',
      id: uuid(),
      onSuccess: () => {},
      onError: e => {}
    });
  }

  verifyCallback = token => {
    // Here you will get the final token!!!
    this.setState({
      recaptchaToken: token
    });
    console.log(token, 'verifycallback');
  };

  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <ReCaptcha
          action="login"
          sitekey="6Ldl8WoUAAAAAGj0OIKqbvkm_XiDPbve07JJySBF"
          verifyCallback={this.verifyCallback}
        />
        <TextHeading>{i18n.t('label.login')}</TextHeading>
        <CardLayout>
          <form onSubmit={this.props.onPress}>
            <TCombForm
              ref="loginForm"
              type={loginFormSchema}
              options={this.props.schemaOptions}
              value={this.props.formValue}
            />

            <PrimaryButton
              onClick={event => {
                this.props.onPress(this.state.recaptchaToken);
                event.preventDefault();
              }}
            >
              {i18n.t('label.login')}
            </PrimaryButton>
          </form>
          <LoginFooter />
        </CardLayout>
      </div>
    );
  }
}

Login.propTypes = {
  onPress: PropTypes.func.isRequired,
  formValue: PropTypes.any,
  schemaOptions: PropTypes.any
};

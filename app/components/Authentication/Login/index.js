import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import { ReCaptcha, loadReCaptcha } from 'recaptcha-v3-react';
import uuid from 'uuidv4';

import { loginFormSchema } from '../../../server/parsedSchemas/login';

const PrimaryButton = lazy(() => import('../../Common/Button/PrimaryButton'));
const TextHeading = lazy(() => import('../../Common/Heading/TextHeading'));
const CardLayout = lazy(() => import('../../Common/Card'));
const LoginFooter = lazy(() => import('./LoginFooter'));

import i18n from '../../../locales/i18n.js';

let TCombForm = t.form.Form;

export default class Login extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-underscore-dangle
    this._recaptchaToken = undefined;
  }

  componentDidMount() {
    loadReCaptcha({
      key: '6Ldl8WoUAAAAAGj0OIKqbvkm_XiDPbve07JJySBF',
      id: uuid(),
      onSuccess: () => {
        let gBatch = document.getElementsByClassName('grecaptcha-badge');
        if (gBatch.length > 0) {
          gBatch[0].style.visibility = 'visible';
        }
      },
      onError: e => {
        console.log(e);
      }
    });
  }

  verifyCallback = token => {
    // Here you will get the final token!!!
    // eslint-disable-next-line no-underscore-dangle
    this._recaptchaToken = token;
  };

  refreshToken = () => {
    if (this.recaptcha) {
      this.recaptcha.execute();
    }
  };

  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <ReCaptcha
          ref={ref => (this.recaptcha = ref)}
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
                // eslint-disable-next-line no-underscore-dangle
                this.props.onPress(this._recaptchaToken, this.refreshToken);
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

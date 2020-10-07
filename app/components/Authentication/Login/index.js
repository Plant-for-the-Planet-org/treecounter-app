import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3';
import { uuidv4 } from '../../../utils/uuid';
import { debug } from '../../../debug';
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
    // eslint-disable-next-line no-underscore-dangle
    this._recaptchaToken = undefined;
  }

  componentDidMount() {
    loadReCaptcha('6Ldl8WoUAAAAAGj0OIKqbvkm_XiDPbve07JJySBF', () => {
      let gBatch = document.getElementsByClassName('grecaptcha-badge');
      if (gBatch.length > 0) {
        gBatch[0].style.visibility = 'visible';
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

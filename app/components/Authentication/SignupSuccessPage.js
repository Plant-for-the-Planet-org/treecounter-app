import React, { Component } from 'react';
import i18n from '../../locales/i18n.js';

class SignupSuccessPage extends Component {
  render() {
    return (
      <div className="sidenav-wrapper">
        <div className="registration-successful">
          {i18n.t('label.confirmation')}
        </div>
      </div>
    );
  }
}

export default SignupSuccessPage;

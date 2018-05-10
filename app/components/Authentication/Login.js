import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LiForm from 'liform-react';

import CustomForm from '../Common/CustomForm';
import LoadingIndicator from '../Common/LoadingIndicator';
import LoginFooter from './LoginFooter';

export default class Login extends Component {
  render() {
    return this.state.loading ? (
      <div className="center-wrapper">
        <LoadingIndicator />
      </div>
    ) : (
      <div>
        <h2 className="cs-heading">Log In</h2>
        <LiForm
          schema={this.props.schema}
          onSubmit={this.props.onClick}
          baseForm={CustomForm}
          buttonText="Log In"
          buttonWidth="240"
        />
        }
        <LoginFooter />
      </div>
    );
  }
}

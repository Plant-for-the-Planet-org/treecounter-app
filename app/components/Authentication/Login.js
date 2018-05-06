import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LiForm from 'liform-react';

import CustomForm from '../Common/CustomForm';
import LoginSchema from '../../layouts/loginSchema';
import {login} from '../../actions/authActions';
import LoadingIndicator from '../Common/LoadingIndicator';
import LoginFooter from './LoginFooter';

class Login extends Component {
  constructor () {
    super ();
    window.localStorage.clear ();
    this.state = {
      schema: {},
      loading: true,
    };
  }
  componentDidMount () {
    LoginSchema.subscribe (
      success => this.setState ({schema: success, loading: false}),
      error => console.log (error)
    );
  }
  render () {
    return this.state.loading
      ? <div className="center-wrapper">
          <LoadingIndicator />
        </div>
      : <div>
          <h2 className="cs-heading">Log In</h2>
          <LiForm
            schema={this.state.schema}
            onSubmit={this.props.login}
            baseForm={CustomForm}
            buttonText="Log In"
            buttonWidth="240"
          />
          }
          <LoginFooter />
        </div>;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators ({login}, dispatch);
};

export default connect (null, mapDispatchToProps) (Login);

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

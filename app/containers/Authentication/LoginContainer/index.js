import LoginContainer from './LoginContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../../actions/authActions';
import React from 'react';

class Login extends React.Component {
  render() {
    return <LoginContainer {...this.props} />;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch);
};

export default connect(null, mapDispatchToProps)(Login);

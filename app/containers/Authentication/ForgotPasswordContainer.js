import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';

import ForgotPassword from '../../components/Authentication/ForgotPassword';
import { clearStorage } from '../../stores/localStorage';
import { forgot_password } from '../../actions/authActions';

class ForgotPasswordContainer extends React.Component {
  constructor(props) {
    super(props);
    clearStorage();
    this.onClick = this.onClick.bind(this);
  }

  onClick(value) {
    this.props.forgot_password(value);
  }

  render() {
    return <ForgotPassword onClick={this.onClick} />;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ forgot_password }, dispatch);
};

export default connect(null, mapDispatchToProps)(ForgotPasswordContainer);

ForgotPasswordContainer.propTypes = {
  forgot_password: PropTypes.func
};

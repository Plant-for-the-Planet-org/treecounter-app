import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUp } from '../../actions/signupActions';
import React from 'react';
import { SignUp } from '../../components/Authentication';
import PropTypes from 'prop-types';

class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(profileType, value) {
    this.props.signUp(profileType, value);
  }

  render() {
    return <SignUp onClick={this.onClick} />;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signUp }, dispatch);
};

export default connect(null, mapDispatchToProps)(SignUpContainer);

SignUpContainer.propTypes = {
  signUp: PropTypes.func
};

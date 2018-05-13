import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../actions/authActions';
import React from 'react';
import { clearStorage } from '../../stores/localStorage';
import Login from '../../components/Authentication/Login';
import PropTypes from 'prop-types';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    clearStorage();
    this.onClick = this.onClick.bind(this);
  }

  onClick(value) {
    this.props.login(value);
  }

  render() {
    return <Login onClick={this.onClick} />;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch);
};

export default connect(null, mapDispatchToProps)(LoginContainer);

LoginContainer.propTypes = {
  login: PropTypes.func
};

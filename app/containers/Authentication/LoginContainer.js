import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/authActions';
import { clearStorage } from '../../stores/localStorage';
import { updateRoute } from '../../helpers/routerHelper';
import Login from '../../components/Authentication/Login/index';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    clearStorage();
    this.onClick = this.onClick.bind(this);
  }

  onPress = () => {
    // let result = this.refs.loginForm.validate();
    // if (result.isValid()) {
    let value = this.refs.loginContainer.refs.loginForm.getValue();
    if (value) {
      this.onClick(value);
    }
    // } else if (this.props.onError) {
    //   this.props.onError(result.errors);
    // }
  };

  onClick(value) {
    this.props.login(value);
  }

  render() {
    return (
      <Login
        ref={'loginContainer'}
        onPress={this.onPress}
        updateRoute={this.props.route}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
      route: (routeName, id) => dispatch => updateRoute(routeName, dispatch, id)
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(LoginContainer);

LoginContainer.propTypes = {
  login: PropTypes.func,
  route: PropTypes.func
};

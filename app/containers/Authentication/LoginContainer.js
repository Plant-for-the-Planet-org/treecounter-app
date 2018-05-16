import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../actions/authActions';
import React from 'react';
import { clearStorage } from '../../stores/localStorage';
import Login from '../../components/Authentication/Login';
import PropTypes from 'prop-types';
import { updateRoute } from '../../helpers/routerHelper';

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
    return <Login onClick={this.onClick} updateRoute={this.props.route} />;
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

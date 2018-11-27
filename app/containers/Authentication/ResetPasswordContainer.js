import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';

import ResetPassword from '../../components/Authentication/ResetPasssword';
import { reset_password } from '../../actions/authActions';
import { updateRoute } from '../../helpers/routerHelper';

class ResetPassswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onPress = () => {
    let value = this.refs.resetPasswordContainer.refs.resetPasswordForm.getValue();
    if (value) {
      let forgotPassword = value;
      this.onClick(forgotPassword);
    }
  };

  onClick(value) {
    this.props.reset_password(value, this.props.navigation);
  }

  render() {
    let value = { token: this.props.match.params.token };
    return (
      <ResetPassword
        ref="resetPasswordContainer"
        onSetPassword={this.onPress}
        updateRoute={this.props.route}
        value={value}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      reset_password,
      route: (routeName, id) => dispatch => updateRoute(routeName, dispatch, id)
    },
    dispatch
  );
};

ResetPassswordContainer.propTypes = {
  reset_password: PropTypes.func,
  route: PropTypes.func,
  navigation: PropTypes.any,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }).isRequired
};

export default connect(null, mapDispatchToProps)(ResetPassswordContainer);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';

import ForgotPassword from '../../components/Authentication/ForgotPassword';
import { forgot_password } from '../../actions/authActions';
import { updateRoute } from '../../helpers/routerHelper';

class ForgotPasswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onPress = () => {
    let value = this.refs.forgotPasswordContainer.refs.forgotPasswordForm.getValue();
    if (value) {
      this.onClick(value);
    }
  };

  onClick(value) {
    this.props.forgot_password(value, this.props.navigation);
  }

  render() {
    return (
      <ForgotPassword
        ref="forgotPasswordContainer"
        onResetPassword={this.onPress}
        updateRoute={(routeName, id) =>
          this.props.route(routeName, id, this.props.navigation)
        }
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      forgot_password,
      route: (routeName, id, navigation) => dispatch =>
        updateRoute(routeName, navigation || dispatch, id)
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(ForgotPasswordContainer);

ForgotPasswordContainer.propTypes = {
  forgot_password: PropTypes.func,
  route: PropTypes.func,
  navigation: PropTypes.object
};

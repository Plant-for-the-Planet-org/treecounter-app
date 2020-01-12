import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';

import ForgotPassword from '../../components/Authentication/ForgotPassword';
import { forgot_password } from '../../actions/authActions';
import { updateRoute } from '../../helpers/routerHelper';
import { schemaOptions } from '../../server/parsedSchemas/forgotpassword';
import { handleServerResponseError } from '../../helpers/utils';

class ForgotPasswordContainer extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { schemaOptions: schemaOptions };
  }

  onPress = () => {
    let value = this.refs.forgotPasswordContainer.refs.forgotPasswordForm
      .values;
    if (value) {
      this.props
        .forgot_password(value, this.props.navigation)
        .then((/* val */) => {})
        .catch(err => {
          let newSchemaOptions = handleServerResponseError(
            err,
            this.state.schemaOptions
          );
          this.setState(
            {
              schemaOptions: {
                ...newSchemaOptions
              }
            },
            () => {
              this.refs.forgotPasswordContainer.refs.forgotPasswordForm.validate();
            }
          );
        });
    }
  };

  render() {
    return (
      <ForgotPassword
        ref="forgotPasswordContainer"
        onResetPassword={this.onPress}
        schemaOptions={this.state.schemaOptions}
        updateRoute={(routeName, id) =>
          this.props.route(routeName, id, this.props.navigation)
        }
        navigation={this.props.navigation}
        forgetPasswordFunction={this.props.forgot_password}
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
  navigation: PropTypes.any
};

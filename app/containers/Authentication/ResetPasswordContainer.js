import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { lazy } from 'react';
import PropTypes from 'prop-types';

const ResetPassword = lazy(() =>
  import('../../components/Authentication/ResetPasssword')
);

import { reset_password } from '../../actions/authActions';
import { updateRoute } from '../../helpers/routerHelper';

import { schemaOptions } from '../../server/parsedSchemas/resetPassword';
import { handleServerResponseError } from '../../helpers/utils';

class ResetPassswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = { schemaProp: schemaOptions, formValue: {} };
  }
  onPress = () => {
    let value = this.refs.resetPasswordContainer.refs.resetPasswordForm.getValue();
    if (value) {
      this.setState({ formValue: value });
      let forgotPassword = value;
      this.onClick(forgotPassword);
    }
  };

  onClick(value) {
    this.props
      .reset_password(value, this.props.navigation)
      .then((/* val */) => {})
      .catch(err => {
        let newSchemaOptions = handleServerResponseError(
          err,
          this.state.schemaProp
        );
        this.setState(
          {
            schemaProp: {
              ...newSchemaOptions
            }
          },
          () => {
            this.refs.resetPasswordContainer.refs.resetPasswordForm.validate();
          }
        );
      });
  }

  render() {
    let value = {
      token: this.props.navigation
        ? this.props.navigation.getParam('token')
        : this.props.match.params.token
    };
    return (
      <ResetPassword
        ref="resetPasswordContainer"
        schemaProp={this.state.schemaProp}
        onSetPassword={this.onPress}
        updateRoute={this.props.route}
        formValue={{ ...this.state.formValue, ...value }}
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

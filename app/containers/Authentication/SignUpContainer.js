import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';

import { updateRoute } from '../../helpers/routerHelper';
import { SignUp } from '../../components/Authentication';
import { signUp } from '../../actions/signupActions';
import { schemaOptions } from '../../server/parsedSchemas/signup';
import _ from 'lodash';
class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formValue: {}, schemaOptions };
  }

  onSignUpClicked = profileType => {
    console.log(this.refs.signupContainer.refs.signupForm.validate());
    let formValue = this.refs.signupContainer.refs.signupForm.getValue();
    if (formValue) {
      this.props
        .signUp(profileType, formValue)
        .then(success => {})
        .catch(err => {
          console.log('err signup data', err);
          const data = err.response.data;
          if (data && data.code == 400 && data.hasOwnProperty('errors')) {
            for (let property in data.errors.children) {
              if (
                data.errors.children.hasOwnProperty(property) &&
                data.errors.children[property].hasOwnProperty('errors')
              ) {
                let newOptions = _.cloneDeep(this.state.schemaOptions);
                newOptions[profileType].fields[property].hasError = true;
                let oldValidator =
                  newOptions[profileType].fields[property].error;
                if (typeof oldValidator === 'function') {
                  newOptions[profileType].fields[property].error = (
                    value,
                    path,
                    context
                  ) => {
                    let errorReturn = oldValidator(value, path, context);
                    if (!errorReturn) {
                      errorReturn = (
                        <div className="error-msg">
                          {data.errors.children[property].errors.toString()}
                        </div>
                      );
                    }
                    return errorReturn;
                  };
                }
                this.setState({ schemaOptions: newOptions }, () => {
                  this.refs.signupContainer.refs.signupForm.validate();
                });
              }
            }
          }
        });
      this.setState({ formValue: formValue });
    }
  };

  render() {
    return (
      <SignUp
        ref="signupContainer"
        onSignUpClicked={this.onSignUpClicked}
        formValue={this.state.formValue}
        updateRoute={(routeName, id) =>
          this.props.route(routeName, id, this.props.navigation)
        }
        schemaOptions={this.state.schemaOptions}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signUp,
      route: (routeName, id, navigation) => dispatch =>
        updateRoute(routeName, navigation || dispatch, id)
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(SignUpContainer);

SignUpContainer.propTypes = {
  signUp: PropTypes.func,
  route: PropTypes.func,
  navigation: PropTypes.object
};

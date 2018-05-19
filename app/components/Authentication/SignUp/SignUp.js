import React, { Component } from 'react';
// import LiForm from 'liform-react';
import PropTypes from 'prop-types';

// import signupFormSchema from '../../../server/formSchemas/signup';
import TextHeading from '../../Common/Text/TextHeading';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profiletype: 'individual'
    };
    this.profile = this.profile.bind(this);
    this.onClick = props.onClick.bind(this, this.state.Profiletype);
  }
  profile(type) {
    this.setState({
      Profiletype: type
    });
  }

  render() {
    return (
      <div className="sidenav-wrapper">
        <div className="app-container__content--center">
          <TextHeading>Join In</TextHeading>
          {/* <LiForm
            schema={signupFormSchema[this.state.Profiletype]}
            baseForm={CustomForm}
            onSubmit={this.onClick}
            buttonText="Sign Up"
            buttonWidth="240"
          /> */}
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  onClick: PropTypes.func.isRequired
};

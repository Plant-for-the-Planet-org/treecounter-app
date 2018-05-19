import React, { Component } from 'react';
// import LiForm from 'liform-react';
import PropTypes from 'prop-types';

// import signupFormSchema from '../../../server/formSchemas/signup';
import TextHeading from '../../Common/Text/TextHeading';
import SignUpType from './SignUpType';
import { SignupJustMe, SignupOrganization } from '../../../assets';

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
          <div className="signup-types">
            <SignUpType
              active="true"
              imgSrc={SignupOrganization}
              salutation="I am a"
              title="Tree-Planting Organisation"
            />
            <SignUpType
              active="false"
              imgSrc={SignupJustMe}
              salutation="I am"
              title="Just me"
            />
            <SignUpType
              active="false"
              imgSrc={SignupOrganization}
              salutation="I am a"
              title="Company"
            />
            <SignUpType
              active="false"
              imgSrc={SignupOrganization}
              salutation="I am a"
              title="School"
            />
          </div>
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

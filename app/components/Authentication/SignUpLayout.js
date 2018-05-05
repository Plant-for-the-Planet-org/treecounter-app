import React, { Component } from 'react';
import * as join from '../../constants/strings';
import SignUpType from './SignUpType';

export default class SignupLayout extends Component {
  render() {
    return (
      <div className="signup-layout">
        <div className="row">
          <h1>{join.title}</h1>
        </div>
        <div className="flex-row f-center f-wrap margin-1">
          <SignUpType
            type="tpo"
            style="circle bg-tree-org "
            profiletype={this.props.profiletype}
            profile={this.props.profile}
          />
          <SignUpType
            type="individual"
            style="circle bg-justme "
            profiletype={this.props.profiletype}
            profile={this.props.profile}
          />
          <SignUpType
            type="company"
            style="circle bg-company "
            profiletype={this.props.profiletype}
            profile={this.props.profile}
          />
          <SignUpType
            type="education"
            style="circle bg-school "
            profiletype={this.props.profiletype}
            profile={this.props.profile}
          />
        </div>
      </div>
    );
  }
}

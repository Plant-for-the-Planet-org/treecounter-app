import React from 'react';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import t from 'tcomb-form';
import PrimaryButton from '../Common/Button/PrimaryButton';
import PropTypes from 'prop-types';
import UserProfileImage from '../Common/UserProfileImage';
import ActionButton from '../Common/ActionButton';
import { parsedSchema } from '../../server/parsedSchemas/editProfile';

let TCombForm = t.form.Form;
export default class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    console.log(parsedSchema);
  }
  render() {
    console.log('___render___Edit_userprofile');
    const { type, image } = this.props.currentUserProfile;
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>Edit Profile</TextHeading>
        <CardLayout>
          <UserProfileImage profileImage={image} />
          <TCombForm
            ref={'image'}
            type={parsedSchema[type].image.transformedSchema}
            options={parsedSchema[type].image.schemaOptions}
            value={this.props.currentUserProfile}
          />
          <TCombForm
            ref={'profile'}
            type={parsedSchema[type].profile.transformedSchema}
            options={parsedSchema[type].profile.schemaOptions}
            value={this.props.currentUserProfile}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type, 'profile');
            }}
          >
            Save Changes
          </PrimaryButton>
        </CardLayout>
        {/* //about_me section */}
        <CardLayout>
          <TCombForm
            ref={'about_me'}
            type={parsedSchema[type].about_me.transformedSchema}
            options={parsedSchema[type].about_me.schemaOptions}
            value={this.props.currentUserProfile}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type, 'about_me');
            }}
          >
            Save Changes
          </PrimaryButton>
        </CardLayout>
        <CardLayout>
          <TCombForm
            ref={'password'}
            type={parsedSchema[type].password.transformedSchema}
            options={parsedSchema[type].password.schemaOptions}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type, 'password');
            }}
          >
            Change Passwords
          </PrimaryButton>
        </CardLayout>
        <CardLayout>Following</CardLayout>
        <ActionButton caption="Delete Profile" />
      </div>
    );
  }
}

EditUserProfile.propTypes = {
  onSave: PropTypes.func.isRequired,
  currentUserProfile: PropTypes.object
};

import React from 'react';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import t from 'tcomb-form';
import PrimaryButton from '../Common/Button/PrimaryButton';
import PropTypes from 'prop-types';

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
    const { type } = this.props.currentUserProfile;
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>Edit Profile</TextHeading>
        <CardLayout>
          <TCombForm
            ref={type}
            type={parsedSchema[type].profile.transformedSchema}
            options={parsedSchema[type].profile.schemaOptions}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type);
            }}
          >
            Save Changes
          </PrimaryButton>
        </CardLayout>
        {/* //about_me section */}
        <CardLayout>
          <TCombForm
            ref={type}
            type={parsedSchema[type].about_me.transformedSchema}
            options={parsedSchema[type].about_me.schemaOptions}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type);
            }}
          >
            Save Changes
          </PrimaryButton>
        </CardLayout>
        <CardLayout>
          <TCombForm
            ref={type}
            type={parsedSchema[type].password.transformedSchema}
            options={parsedSchema[type].password.schemaOptions}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type);
            }}
          >
            Save Changes
          </PrimaryButton>
        </CardLayout>
      </div>
    );
  }
}

EditUserProfile.propTypes = {
  onSave: PropTypes.func.isRequired,
  currentUserProfile: PropTypes.object
};

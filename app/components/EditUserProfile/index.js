import React from 'react';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import t from 'tcomb-form';
import PrimaryButton from '../Common/Button/PrimaryButton';
import PropTypes from 'prop-types';
import {
  schemaOptions,
  signupFormSchema
} from '../../server/parsedSchemas/signup';

let TCombForm = t.form.Form;
export default class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
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
            type={signupFormSchema[type]}
            options={schemaOptions[type]}
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

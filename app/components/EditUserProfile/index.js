import React from 'react';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import t from 'tcomb-form';
import PrimaryButton from '../Common/Button/PrimaryButton';
import SecondaryButton from '../Common/Button/SecondaryButton';
import PropTypes from 'prop-types';
import UserProfileImage from '../Common/UserProfileImage';
import {
  parsedSchema,
  plantProjectSchema
} from '../../server/parsedSchemas/editProfile';
import PaswordUpdatedDialog from './PaswordUpdateModal';
import ConfirmProfileDeletion from './ConfirmProfileDeletionModal';
import i18n from '../../locales/i18n.js';

let TCombForm = t.form.Form;
export default class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    console.log(parsedSchema);
    this.state = {
      showConfirmProfileDeletion: false
    };
  }
  toggleConfirmProfileDeletion = () => {
    this.setState({
      showConfirmProfileDeletion: !this.state.showConfirmProfileDeletion
    });
  };

  getFormTemplate = (userType, profileType) => {
    console.log(profileType);
    switch (profileType) {
      case 'profile': {
        return locals => {
          console.log(locals);
          return (
            <div className="tComb-template__profile-form">
              <div>
                {locals.inputs.title}
                {locals.inputs.name}
                {locals.inputs.firstname}
                {locals.inputs.lastname}
                {locals.inputs.gender}
                {locals.inputs.subType}
              </div>

              <div>
                {locals.inputs.address}
                {locals.inputs.zipCode}
                {locals.inputs.city}
                {locals.inputs.country}
                <div>
                  {locals.inputs.mayContact}
                  {locals.inputs.mayPublish}
                </div>
              </div>
            </div>
          );
        };
      }
      case 'about_me': {
        return locals => {
          console.log(locals);
          return (
            <div className="tComb-template__about-me-form">
              <div>
                {locals.inputs.synopsis1}
                {locals.inputs.synopsis2}
              </div>

              <div>
                {locals.inputs.url}
                {locals.inputs.linkText}
              </div>
            </div>
          );
        };
      }
      case 'password': {
        return locals => {
          console.log(locals);
          return (
            <div className="tComb-template__password-form">
              <div>{locals.inputs.currentPassword}</div>

              <div>{locals.inputs.password}</div>
            </div>
          );
        };
      }
    }
  };

  getFormSchemaOption = (userType, profileType) => {
    if (profileType == 'project') {
      return {
        template: locals => {
          return <div>{locals.inputs.plantProjects}</div>;
        },
        ...plantProjectSchema.schemaOptions
      };
    }
    let schemaOptions = parsedSchema[userType][profileType].schemaOptions;
    return {
      template: this.getFormTemplate(userType, profileType),
      ...schemaOptions
    };
  };

  handlePlantProjectChange = (value, path) => {
    // check if the currency field is changed
    if (path && path[path.length - 2] === 'plantProjects') {
      console.log('onchange Plant project list', value, path);
      let index = path[path.length - 1];
      console.log('currency changed on item %s', index);
      let oldValue = this.props.currentUserProfile.plantProjects;
      if (value && value.plantProjects.length < oldValue.length) {
        console.log('project deleted');
        this.props.deletePlantProject(oldValue[index].id);
      } else if (value && value.plantProjects.length > oldValue.length) {
        console.log('Saved Initiated');
        let validatedValue = this.refs.project.validate();
        if (validatedValue) {
          console.log(validatedValue);
        }
      } else {
        console.log('Saved Initiated');
        let validatedValue = this.refs.project.validate();
        if (validatedValue) {
          console.log(validatedValue);
          if (validatedValue.errors && validatedValue.errors.length) {
            for (let errIndex in Object.keys(validatedValue.errors)) {
              let err = validatedValue.errors[errIndex];
              if (err.path[err.path.length - 2] == index) {
                //do nothing
                return;
              }
            }
          }
          let valueToUpdate = validatedValue.value.plantProjects[index];
          console.log(valueToUpdate);
          this.props.updatePlantProject(
            valueToUpdate,
            value.plantProjects[index].id
          );
        }
      }
    }
  };

  render() {
    console.log('___render___Edit_userprofile');
    const { type, image } = this.props.currentUserProfile;
    return (
      <div className="app-container__content--center sidenav-wrapper edit-user-profile__container ">
        <ConfirmProfileDeletion
          isOpen={this.state.showConfirmProfileDeletion}
          onRequestClose={this.toggleConfirmProfileDeletion}
          handleProfileDeletion={() => {
            this.props.deleteProfile();
            this.toggleConfirmProfileDeletion();
          }}
        />
        <PaswordUpdatedDialog
          isOpen={this.props.openPasswordUpdatedDialog}
          onRequestClose={this.props.handlePaswordUpdatedClose}
        />
        <TextHeading>{i18n.t('label.edit_profile')}</TextHeading>
        <CardLayout className="user-profile__form-group">
          <div className="profile-image__container">
            <UserProfileImage profileImage={image} />
            <TCombForm
              ref={'image'}
              type={parsedSchema[type].image.transformedSchema}
              options={parsedSchema[type].image.schemaOptions}
              value={this.props.currentUserProfile}
            />
          </div>

          <TCombForm
            ref={'profile'}
            type={parsedSchema[type].profile.transformedSchema}
            options={this.getFormSchemaOption(type, 'profile')}
            value={this.props.currentUserProfile}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type, 'profile');
            }}
          >
            {i18n.t('label.save_changes')}
          </PrimaryButton>
        </CardLayout>
        {type == 'tpo' ? (
          <div className="user-profile__project-form-group">
            <TCombForm
              ref={'project'}
              type={plantProjectSchema.transformedSchema}
              onChange={this.handlePlantProjectChange}
              options={this.getFormSchemaOption('tpo', 'project')}
              value={this.props.currentUserProfile}
            />
          </div>
        ) : null}
        <CardLayout className="user-profile__form-group">
          <div className="form-group__heading">{i18n.t('label.about_me')}</div>
          <TCombForm
            ref={'about_me'}
            type={parsedSchema[type].about_me.transformedSchema}
            options={this.getFormSchemaOption(type, 'about_me')}
            value={this.props.currentUserProfile}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type, 'about_me');
            }}
          >
            {i18n.t('label.save_changes')}
          </PrimaryButton>
        </CardLayout>
        <CardLayout className="user-profile__form-group">
          <div className="form-group__heading">
            {i18n.t('label.change_password')}
          </div>
          <TCombForm
            ref={'password'}
            type={parsedSchema[type].password.transformedSchema}
            options={this.getFormSchemaOption(type, 'password')}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onSave(type, 'password');
            }}
          >
            {i18n.t('label.change_password')}
          </PrimaryButton>
        </CardLayout>
        <div className="delete-profile__button">
          <SecondaryButton
            onClick={() => {
              this.toggleConfirmProfileDeletion();
            }}
          >
            {i18n.t('label.delete_profile')}
          </SecondaryButton>
        </div>
      </div>
    );
  }
}

EditUserProfile.propTypes = {
  onSave: PropTypes.func.isRequired,
  currentUserProfile: PropTypes.object,
  openPasswordUpdatedDialog: PropTypes.bool,
  handlePaswordUpdatedClose: PropTypes.func,
  deleteProfile: PropTypes.func.isRequired,
  updatePlantProject: PropTypes.func.isRequired,
  deletePlantProject: PropTypes.func.isRequired
};

export { PaswordUpdatedDialog, ConfirmProfileDeletion };

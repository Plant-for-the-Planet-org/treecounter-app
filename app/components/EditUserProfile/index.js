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
import PlantProjectTemplate from './PlantProjectTemplate';

const plantProjectFormOptions = {
  template: PlantProjectTemplate(),
  ...plantProjectSchema.schemaOptions
};
let TCombForm = t.form.Form;
export default class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    console.log(parsedSchema);
    this.state = {
      showConfirmProfileDeletion: false,
      plantProjects:
        (props &&
          props.currentUserProfile &&
          props.currentUserProfile.plantProjects) ||
        []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      plantProjects:
        (nextProps &&
          nextProps.currentUserProfile &&
          nextProps.currentUserProfile.plantProjects) ||
        []
    });
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
    let schemaOptions = parsedSchema[userType][profileType].schemaOptions;
    return {
      template: this.getFormTemplate(userType, profileType),
      ...schemaOptions
    };
  };

  render() {
    console.log('___render___Edit_userprofile');
    const { type, image } = this.props.currentUserProfile;

    let plantProjectList = null;
    if (type == 'tpo') {
      plantProjectList = this.state.plantProjects.map((plantProject, index) => {
        return (
          <React.Fragment key={index}>
            <div className="user-profile__project-form-group">
              <div className="plant-project__item">
                <TCombForm
                  ref={'plantProject' + plantProject.id}
                  type={plantProjectSchema.transformedSchema}
                  options={{
                    template: PlantProjectTemplate(index),
                    ...plantProjectSchema.schemaOptions
                  }}
                  value={plantProject}
                />
                <PrimaryButton
                  onClick={() => {
                    //update the old project info
                    let formRef = 'plantProject' + plantProject.id;
                    console.log(this.refs[formRef].validate());

                    let value = this.refs[formRef].getValue();
                    if (value) {
                      //if image file is same dont update it
                      //same thing will need to handle for 'plantProjectImages array
                      if (value.imageFile == plantProject.imageFile) {
                        value = Object.assign({}, value);
                        delete value.imageFile;
                      }
                      if (plantProject.id) {
                        this.props.updatePlantProject({
                          ...value,
                          id: plantProject.id
                        });
                      } else {
                        console.log('post new project here');
                        this.props.addPlantProject(value);
                      }
                    }
                  }}
                >
                  {i18n.t('label.save_changes')}
                </PrimaryButton>
                <div
                  key={index}
                  onClick={() => {
                    console.log('click delete');
                    if (plantProject.id) {
                      this.props.deletePlantProject(plantProject.id);
                    } else {
                      //update local state
                    }
                  }}
                  className="delete-project"
                >
                  delete project
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      });
    }

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

        {plantProjectList}
        {type == 'tpo' ? (
          <div className="pftp-addbutton">
            <button
              onClick={() => {
                console.log(plantProjectFormOptions);
                const newPlantProjects = [...this.state.plantProjects]; // clone the array
                newPlantProjects.push({ name: '' });
                this.setState({ plantProjects: newPlantProjects });
              }}
            >
              +&nbsp;Add new project
            </button>
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
  deletePlantProject: PropTypes.func.isRequired,
  addPlantProject: PropTypes.func.isRequired
};

export { PaswordUpdatedDialog, ConfirmProfileDeletion };

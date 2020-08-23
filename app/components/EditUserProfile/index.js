import React from 'react';
import t from 'tcomb-form';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card';
import PrimaryButton from '../Common/Button/PrimaryButton';
import SecondaryButton from '../Common/Button/SecondaryButton';
import UserProfileImage from '../Common/UserProfileImage';
import {
  parsedSchema,
  plantProjectSchema
} from '../../server/parsedSchemas/editProfile';
import PaswordUpdatedDialog from './PaswordUpdateModal';
import ConfirmProfileDeletion from './ConfirmProfileDeletionModal';
import i18n from '../../locales/i18n.js';
import PlantProjectTemplate from './PlantProjectTemplate';
import {
  UserProfileTemplate,
  UserAboutmeTemplate,
  UserPasswordUpdateTemplate
} from './PlantProjectUserProfileTemplates';
import LoadingIndicator from '../Common/LoadingIndicator';
import { ProfilePic } from '../../assets';
import { getImageUrl } from '../../actions/apiRouting';
import FollowLabelButton from '../Common/Button/FollowLabelButton';
import { updateRoute } from '../../helpers/routerHelper';

let TCombForm = t.form.Form;
const emptyProjectInfo = { name: '' };

export default class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmProfileDeletion: false,
      passwordNotSameError: false,
      plantProjects: (props &&
        props.currentUserProfile &&
        props.currentUserProfile.plantProjects) || [emptyProjectInfo]
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      plantProjects: (nextProps &&
        nextProps.currentUserProfile &&
        nextProps.currentUserProfile.plantProjects) || [emptyProjectInfo]
    });
  }

  toggleConfirmProfileDeletion = () => {
    this.setState({
      showConfirmProfileDeletion: !this.state.showConfirmProfileDeletion
    });
  };

  handleAddNewProject = () => {
    const newPlantProjects = [...this.state.plantProjects]; // clone the array
    newPlantProjects.push(emptyProjectInfo);
    this.setState({ plantProjects: newPlantProjects });
  };

  handleDeleteProjectCLick = (plantProject, index) => {
    if (plantProject.id) {
      this.props.deletePlantProject(plantProject.id);
    } else {
      const newPlantProjects = [...this.state.plantProjects]; // clone the array
      newPlantProjects.splice(index, 1);
      this.setState({ plantProjects: newPlantProjects });
    }
  };

  mergeProjectImages(newPlantProjectImages) {
    if (!newPlantProjectImages) {
      return [];
    }
    let uploadPlantProjectImages = [];
    uploadPlantProjectImages = newPlantProjectImages.map(newProjectImage => {
      if (newProjectImage.image && newProjectImage.image.includes('base64')) {
        let { image: imageFile, description } = newProjectImage;

        return newProjectImage.id
          ? { imageFile, description, id: newProjectImage.id }
          : { imageFile, description };
      }
      return newProjectImage;
    });

    return uploadPlantProjectImages;
  }

  handleSaveProjectClick = (plantProject, index) => {
    let formRef = 'plantProject' + index;
    let value = this.refs[formRef].getValue();
    if (value) {
      //if image file is same dont update it
      //similarly need to handle for 'plantProjectImages array
      if (value.imageFile == plantProject.imageFile) {
        value = Object.assign({}, value);
        delete value.imageFile;
      }
      let plantProjectImages = this.mergeProjectImages(
        value.plantProjectImages
      );
      if (plantProject.id) {
        this.props.updatePlantProject({
          ...value,
          id: plantProject.id,
          plantProjectImages
        });
      } else {
        this.props.addPlantProject(value);
      }
    }
  };

  getFormTemplate = (userType, profileType) => {
    switch (profileType) {
      case 'profile':
        return UserProfileTemplate;
      case 'about_me':
        return UserAboutmeTemplate;
      case 'password':
        return UserPasswordUpdateTemplate;
    }
  };

  changeEmail = () => {
    let formRef = 'change_email';
    debug(this.refs[formRef].validate());

    let value = this.refs[formRef].getValue();
    this.props.updateEmail(value);
  };

  getFormSchemaOption = (userType, profileType) => {
    let schemaOptions = parsedSchema[userType][profileType].schemaOptions;
    if (profileType == 'password') {
      try {
        schemaOptions.fields.password.fields.first.hasError = schemaOptions.fields.password.fields.second.hasError = this.state.passwordNotSameError;
        schemaOptions.fields.password.fields.first.error = schemaOptions.fields.password.fields.second.error = (
          <div className="error-msg">{i18n.t('label.same_password_error')}</div>
        );
      } catch (err) {
        debug(err);
      }
    }

    return {
      template: this.getFormTemplate(userType, profileType),
      ...schemaOptions
    };
  };

  getPlantProjectList = () => {
    let plantProjectList = this.state.plantProjects.map(
      (plantProject, index) => {
        return (
          <React.Fragment key={index}>
            <div className="user-profile__project-form-group">
              <div className="plant-project__item">
                <TCombForm
                  ref={'plantProject' + index}
                  type={plantProjectSchema.transformedSchema}
                  options={{
                    template: PlantProjectTemplate(index),
                    ...plantProjectSchema.schemaOptions
                  }}
                  value={plantProject}
                />
                <PrimaryButton
                  onClick={() => {
                    this.handleSaveProjectClick(plantProject, index);
                  }}
                >
                  {i18n.t('label.save_changes')}
                </PrimaryButton>
                <div
                  key={index}
                  onClick={() => {
                    this.handleDeleteProjectCLick(plantProject, index);
                  }}
                  className="delete-project"
                >
                  {i18n.t('label.delete_project')}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      }
    );
    return plantProjectList;
  };

  render() {
    const {
      type,
      image,
      treecounter: treeCounter
    } = this.props.currentUserProfile;
    //earlier we have synopsis1 and synopsis two fields to manage user introduction
    //now we will show only one which is synopsis1, to show both info for old user lets merge them here
    const updatedUserProfile = {
      ...this.props.currentUserProfile,
      synopsis1: `${
        this.props.currentUserProfile.synopsis1
          ? this.props.currentUserProfile.synopsis1
          : ''
      }${
        this.props.currentUserProfile.synopsis2
          ? ' ' + this.props.currentUserProfile.synopsis2
          : ''
      }`,
      synopsis2: ''
    };
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
              value={updatedUserProfile}
              // eslint-disable-next-line no-underscore-dangle
              onChange={value => (this._profileImageValue = value)}
            />
          </div>

          <TCombForm
            ref={'profile'}
            type={parsedSchema[type].profile.transformedSchema}
            options={this.getFormSchemaOption(type, 'profile')}
            value={updatedUserProfile}
          />
          <PrimaryButton
            onClick={() => {
              this.props.onSave(
                type,
                'profile',
                undefined,
                // eslint-disable-next-line no-underscore-dangle
                this._profileImageValue
              );
            }}
          >
            {i18n.t('label.save_changes')}
          </PrimaryButton>
        </CardLayout>

        {/*{type == 'tpo' ? (*/}
        {/*<div className="plant-project__container">*/}
        {/*{this.getPlantProjectList()}*/}
        {/*<div className="pftp-addbutton">*/}
        {/*<button*/}
        {/*onClick={() => {*/}
        {/*this.handleAddNewProject();*/}
        {/*}}*/}
        {/*>*/}
        {/*+&nbsp;{i18n.t('label.new_project')}*/}
        {/*</button>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*) : null}*/}

        <CardLayout className="user-profile__form-group">
          <div className="form-group__heading">{i18n.t('label.about_me')}</div>
          <TCombForm
            ref={'about_me'}
            type={parsedSchema[type].about_me.transformedSchema}
            options={this.getFormSchemaOption(type, 'about_me')}
            value={updatedUserProfile}
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
              let value = this.refs.password.getValue();
              if (value && value.password && value.password.first !== value.password.second) {
                //same password
                this.setState({ passwordNotSameError: true });
                return;
              }
              this.setState({ passwordNotSameError: false });
              this.props.onSave(type, 'password');
            }}
          >
            {i18n.t('label.change_password')}
          </PrimaryButton>
        </CardLayout>

        <CardLayout className="user-profile__form-group">
          <div className="form-group__heading">
            {i18n.t('label.change_email')}
          </div>
          <TCombForm
            ref={'change_email'}
            type={parsedSchema[type].email.transformedSchema}
            options={this.getFormSchemaOption(type, 'email')}
          />
          <div className="form-group__heading">
            {i18n.t('label.change_email_warning')}
          </div>
          <PrimaryButton
            onClick={() => {
              this.changeEmail();
            }}
          >
            {i18n.t('label.save_changes')}
          </PrimaryButton>
        </CardLayout>

        {treeCounter && treeCounter.followeeIds && (
          <CardLayout className="user-profile__form-group">
            <div className="form-group__heading">
              {i18n.t('label.subscribed')}
            </div>
            {this.props.followeeList && this.props.followeeList.length > 0 ? (
              <div className="follow-container">
                {this.props.followeeList.map(follow => (
                  <div className="follow-container-row" key={follow.id}>
                    <div className="col col1">
                      <img
                        src={
                          follow.userProfile.image
                            ? getImageUrl(
                                'profile',
                                'thumb',
                                follow.userProfile.image
                              )
                            : ProfilePic
                        }
                        className="image-rounded-border"
                      />
                    </div>
                    <div
                      className="col col2"
                      onClick={() => {
                        updateRoute('app_treecounter', null, follow.id, {
                          treecounter: follow.id
                        });
                      }}
                    >
                      {follow.displayName}
                    </div>
                    <div className="col col3">
                      <FollowLabelButton
                        label={i18n.t('label.unsubscribe')}
                        isSubscribed
                        onClick={() => this.props.unfollowUser(follow.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <LoadingIndicator />
            )}
          </CardLayout>
        )}
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
  updateEmail: PropTypes.func,
  updatePlantProject: PropTypes.func.isRequired,
  deletePlantProject: PropTypes.func.isRequired,
  addPlantProject: PropTypes.func.isRequired,
  followeeList: PropTypes.array,
  unfollowUser: PropTypes.func
};

export { PaswordUpdatedDialog, ConfirmProfileDeletion };

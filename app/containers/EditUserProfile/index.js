import React from 'react';
import EditUserProfile from '../../components/EditUserProfile';
import { currentUserProfileSelector } from '../../selectors/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updateUserProfile,
  updatePlantProject,
  deletePlantProject,
  addPlantProject,
  deleteUserProfile
} from '../../actions/updateUserProfile';
import { bindActionCreators } from 'redux';
import i18n from '../../locales/i18n.js';
import { NotificationManager } from '../../notification/PopupNotificaiton/notificationManager';

const profileTypeLabel = {
  about_me: i18n.t('label.about_me'),
  profile: i18n.t('label.profile'),
  password: i18n.t('label.password')
};

class EditUserProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordDialog: false
    };
  }
  deleteProfile = () => {
    console.log(
      'call Profile Deletion API here',
      this.props.currentUserProfile
    );
    this.props
      .deleteUserProfile(this.props.currentUserProfile.id)
      .then(data => {
        console.log(data);
      });
  };

  updatePlantProject = plantProject => {
    this.props
      .updatePlantProject(plantProject)
      .then(data => {
        NotificationManager.success(
          `${i18n.t('label.plant_project_update_success')}`,
          i18n.t('label.success_title'),
          5000
        );
      })
      .catch(error => {
        NotificationManager.error(
          error.message,
          i18n.t('label.plant_project_error_title'),
          5000
        );
      });
  };

  deletePlantProject = plantProjectId => {
    this.props
      .deletePlantProject(plantProjectId)
      .then(data => {
        NotificationManager.success(
          `${i18n.t('label.plant_project_delete_success')}`,
          i18n.t('label.success_title'),
          5000
        );
      })
      .catch(error => {
        NotificationManager.error(
          error.message,
          i18n.t('label.plant_project_error_title'),
          5000
        );
      });
  };

  addPlantProject = newProject => {
    this.props
      .addPlantProject(newProject)
      .then(data => {
        NotificationManager.success(
          `${i18n.t('label.plant_project_added_success')}`,
          i18n.t('label.success_title'),
          5000
        );
      })
      .catch(error => {
        NotificationManager.error(
          error.message,
          i18n.t('label.plant_project_error_title'),
          5000
        );
      });
  };

  onSave = (usertype, profileType, formRefs) => {
    const profileForm =
      (formRefs && formRefs[profileType]) ||
      this.refs.EditUserProfileContainer.refs[profileType];
    const imageForm =
      (formRefs && formRefs['image']) ||
      this.refs.EditUserProfileContainer.refs['image'];
    console.log(profileForm.validate());
    let value = profileForm.getValue();

    let imageValue = imageForm.getValue();
    if (imageValue) {
      this.props.updateUserProfile(imageValue, 'image');
    }
    if (value) {
      this.props
        .updateUserProfile(value, profileType)
        .then(data => {
          if (profileType == 'password') {
            this.setState({ showPasswordDialog: true });
          }
          NotificationManager.success(
            `${profileTypeLabel[profileType] || profileType} ${i18n.t(
              'label.updated_successful'
            )}`,
            i18n.t('label.success_title'),
            5000
          );
        })
        .catch(error => {
          NotificationManager.error(
            error.message,
            i18n.t('label.error_title'),
            5000
          );
        });
    }
  };

  handleCloseModal = () => {
    this.setState({ showPasswordDialog: false });
  };

  render() {
    return (
      <EditUserProfile
        ref={'EditUserProfileContainer'}
        currentUserProfile={this.props.currentUserProfile}
        onSave={this.onSave}
        openPasswordUpdatedDialog={this.state.showPasswordDialog}
        handlePaswordUpdatedClose={this.handleCloseModal}
        deleteProfile={this.deleteProfile}
        updatePlantProject={this.updatePlantProject}
        deletePlantProject={this.deletePlantProject}
        addPlantProject={this.addPlantProject}
        navigation={this.props.navigation}
      />
    );
  }
}

EditUserProfileContainer.propTypes = {
  currentUserProfile: PropTypes.object
};

const mapStateToProps = state => ({
  currentUserProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateUserProfile,
      updatePlantProject,
      deletePlantProject,
      addPlantProject,
      deleteUserProfile
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  EditUserProfileContainer
);

EditUserProfileContainer.propTypes = {
  updateUserProfile: PropTypes.func,
  updatePlantProject: PropTypes.func,
  deletePlantProject: PropTypes.func,
  addPlantProject: PropTypes.func,
  deleteUserProfile: PropTypes.func,
  navigation: PropTypes.func
};

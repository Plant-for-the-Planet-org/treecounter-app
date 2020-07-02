import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import EditUserProfile from '../../components/EditUserProfile';
import {currentUserProfileSelector, getProgressModelSelector} from '../../selectors/index';
import {
  updateUserProfile,
  updatePlantProject,
  deletePlantProject,
  addPlantProject,
  deleteUserProfile,
  updateUserEmail
} from '../../actions/updateUserProfile';
import i18n from '../../locales/i18n.js';
import { NotificationManager } from '../../notification/PopupNotificaiton/notificationManager';
import { logoutUser } from '../../actions/authActions';
import { treecounterLookupAction } from '../../actions/treecounterLookupAction';
import { unfollowUser } from '../../actions/followActions';

const profileTypeLabel = {
  about_me: i18n.t('label.about_me'),
  profile: i18n.t('label.profile'),
  password: i18n.t('label.password')
};

class EditUserProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordDialog: false,
      fetchingFolloweeIds: false,
      followeeInfo: undefined
    };
  }

  fetchFolloweeinfo = () => {
    const currentUserProfile = this.props.currentUserProfile;

    if (
      currentUserProfile &&
      currentUserProfile.treecounter &&
      currentUserProfile.treecounter.followeeIds
    ) {
      const followeeIdsList = currentUserProfile.treecounter.followeeIds.split(
        ','
      );
      // eslint-disable-next-line no-underscore-dangle
      let _FolloweeInfo = [];
      followeeIdsList.forEach(id => {
        this.props
          .treecounterLookupAction(id, this.props.navigation)
          .then(treecounter => {
            _FolloweeInfo.push(treecounter);
            if (followeeIdsList.length == _FolloweeInfo.length) {
              this.setState({ followeeInfo: _FolloweeInfo });
            }
          })
          .catch(error => {
            debug(error);
          });
      });
    } else {
      this.setState({ followeeInfo: [] });
    }
  };

  componentDidMount() {
    this.fetchFolloweeinfo();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentUserProfile.treecounter.followeeIds !==
      this.props.currentUserProfile.treecounter.followeeIds
    ) {
      this.fetchFolloweeinfo();
    }
  }

  deleteProfile = () => {
    debug('call Profile Deletion API here', this.props.currentUserProfile);
    this.props
      .deleteUserProfile(this.props.currentUserProfile.id)
      .then((/* data */) => {
        NotificationManager.success(
          `${i18n.t('label.deleted_success')}`,
          i18n.t('label.success'),
          5000
        );
        this.props.logoutUser();
      })
      .catch(error => {
        NotificationManager.error(
          error.message,
          i18n.t('label.error_title'),
          5000
        );
      });
  };

  updateEmail = email => {
    this.props
      .updateUserEmail(email)
      .then((/* data */) => {
        NotificationManager.success(
          i18n.t('label.confirmation_email_will_be_send'),
          i18n.t('label.success'),
          5000
        );
        this.props.logoutUser();
      })
      .catch(err => {
        if (err.response.data.code === 400) {
          NotificationManager.error(
            err.response.data.errors.children.newEmail.errors
              ? err.response.data.errors.children.newEmail.errors[0]
              : err.response.data.errors.children.newEmail.children.first
                ? err.response.data.errors.children.newEmail.children.first.errors[0]
                : err.response.data.errors.children.newEmail.children.second
                  ? err.response.data.errors.children.newEmail.children.second.errors[0]
                  : 'label.error',
            i18n.t('label.error'),
            5000
          );
        } else {
          NotificationManager.error(
            err.response.data ? err.response.data.message : i18n.t('label.error'),
            i18n.t('label.error'),
            5000
          );
        }
      });
  };

  updatePlantProject = plantProject => {
    this.props
      .updatePlantProject(plantProject)
      .then((/* data */) => {
        NotificationManager.success(
          `${i18n.t('label.plant_project_update_success')}`,
          i18n.t('label.success'),
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
      .then((/* data */) => {
        NotificationManager.success(
          `${i18n.t('label.plant_project_delete_success')}`,
          i18n.t('label.success'),
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
      .then((/* data */) => {
        NotificationManager.success(
          `${i18n.t('label.plant_project_added_success')}`,
          i18n.t('label.success'),
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

  // eslint-disable-next-line no-unused-vars
  onSave = (usertype, profileType, formRefs, newImageAvailable) => {
    const profileForm =
      (formRefs && formRefs[profileType]) ||
      this.refs.EditUserProfileContainer.refs[profileType];
    const imageForm =
      (formRefs && formRefs['image']) ||
      this.refs.EditUserProfileContainer.refs['image'];
    debug(profileForm.validate());
    let value = profileForm.getValue();

    let imageValue = undefined;
    if (imageForm) {
      imageValue = imageForm.getValue();
    }
    if (
      !!imageValue &&
      this.props.currentUserProfile.image !== imageValue.imageFile
    ) {
      this.props.updateUserProfile(imageValue, 'image');
    }
    if (value) {
      this.props
        .updateUserProfile(value, profileType)
        .then((/* data */) => {
          if (profileType == 'password') {
            this.setState({ showPasswordDialog: true });
          } else {
            NotificationManager.success(
              `${profileTypeLabel[profileType] || profileType} ${i18n.t(
                'label.updated_successful'
              )}`,
              i18n.t('label.success'),
              5000
            );
          }
        })
        .catch(err => {
          if (err.response.data.code === 400) {
            if (profileType == 'password') {
              NotificationManager.error(
                err.response.data.errors.children.currentPassword.errors
                  ? err.response.data.errors.children.currentPassword.errors[0]
                  : err.response.data.errors.children.password.errors
                    ? err.response.data.errors.children.password.errors[0]
                    : err.response.data.errors.children.password.children.first
                      ? err.response.data.errors.children.password.children.first.errors[0]
                      : err.response.data.errors.children.password.children.second
                        ? err.response.data.errors.children.password.children.second.errors[0]
                        : 'label.error',
                i18n.t('label.error'),
                5000
              );
            } else {
              NotificationManager.error(
                err.response.data ? err.response.data.message : i18n.t('label.error'),
                i18n.t('label.error'),
                5000
              );
            }
          } else {
            NotificationManager.error(
              err.response.data ? err.response.data.message : i18n.t('label.error'),
              i18n.t('label.error'),
              5000
            );
          }
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
        updateEmail={this.updateEmail}
        updatePlantProject={this.updatePlantProject}
        deletePlantProject={this.deletePlantProject}
        addPlantProject={this.addPlantProject}
        navigation={this.props.navigation}
        followeeList={this.state.followeeInfo}
        unfollowUser={this.props.unfollowUser}
        {...this.props}
      />
    );
  }
}

EditUserProfileContainer.propTypes = {
  currentUserProfile: PropTypes.object
};

const mapStateToProps = state => ({
  currentUserProfile: currentUserProfileSelector(state),
  loading: getProgressModelSelector(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateUserProfile,
      updatePlantProject,
      deletePlantProject,
      addPlantProject,
      deleteUserProfile,
      updateUserEmail,
      logoutUser,
      unfollowUser,
      treecounterLookupAction
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
  updateEmail: PropTypes.func,
  navigation: PropTypes.any,
  logoutUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  treecounterLookupAction: PropTypes.func
};

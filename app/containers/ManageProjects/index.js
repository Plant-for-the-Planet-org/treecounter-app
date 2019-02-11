import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ManageProjects from '../../components/ManageProjects';
import { currentUserProfileSelector } from '../../selectors/index';
import {
  updatePlantProject,
  deletePlantProject,
  addPlantProject
} from '../../actions/updateUserProfile';

class ManageProjectContainer extends Component {
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

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <ManageProjects
        currentUserProfile={this.props.currentUserProfile}
        updatePlantProject={this.updatePlantProject}
        deletePlantProject={this.deletePlantProject}
        addPlantProject={this.addPlantProject}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updatePlantProject,
      deletePlantProject,
      addPlantProject
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ManageProjectContainer
);

ManageProjectContainer.propTypes = {
  currentUserProfile: PropTypes.object,
  updatePlantProject: PropTypes.func.isRequired,
  deletePlantProject: PropTypes.func.isRequired,
  addPlantProject: PropTypes.func.isRequired
};

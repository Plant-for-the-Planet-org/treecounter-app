import React from 'react';
import EditUserProfile from '../../components/EditUserProfile';
import { currentUserProfileSelector } from '../../selectors/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updateUserProfile,
  updatePlantProject,
  deletePlantProject,
  addPlantProject
} from '../../actions/updateUserProfile';
import { bindActionCreators } from 'redux';

class EditUserProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordDialog: false
    };
  }
  deleteProfile = () => {
    console.log('call Profile Deletion API here');
  };

  updatePlantProject = plantProject => {
    this.props.updatePlantProject(plantProject);
  };

  deletePlantProject = plantProjectId => {
    this.props.deletePlantProject(plantProjectId);
  };

  addPlantProject = newProject => {
    this.props.addPlantProject(newProject);
  };

  onSave = (usertype, profileType) => {
    console.log(
      this.refs.EditUserProfileContainer.refs[profileType].validate()
    );
    let value = this.refs.EditUserProfileContainer.refs[profileType].getValue();
    let imageValue = this.refs.EditUserProfileContainer.refs[
      'image'
    ].getValue();
    if (value) {
      this.props
        .updateUserProfile(value, profileType)
        .then(data => {
          if (profileType == 'password') {
            this.setState({ showPasswordDialog: true });
          }
        })
        .catch(error => console.log(error));
    }
    if (imageValue) {
      this.props.updateUserProfile(imageValue, 'image');
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
      addPlantProject
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
  addPlantProject: PropTypes.func
};

import React, { Component } from 'react';
import { Text } from 'react-native';
import { PropTypes } from 'prop-types';

export default class EditUserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>Edit Profile Under construction!</Text>;
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

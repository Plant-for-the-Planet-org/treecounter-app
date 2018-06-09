import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllPlantProjectsSelector } from '../../selectors';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import SelectPlantProject from '../../components/SelectPlantProject';

class SelectPlantProjectContainer extends Component {
  render() {
    return (
      <SelectPlantProject
        plantProjects={this.props.plantProjects}
        selectProject={this.props.selectPlantProjectAction}
      />
    );
  }
}

const mapStateToProps = state => ({
  plantProjects: getAllPlantProjectsSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectPlantProjectAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectPlantProjectContainer
);

SelectPlantProjectContainer.propTypes = {
  plantProjects: PropTypes.object,
  selectPlantProjectAction: PropTypes.func
};

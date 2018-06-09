import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllPlantProjectsSelector } from '../../selectors';
import SelectPlantProject from '../../components/SelectPlantProject';

class SelectPlantProjectContainer extends Component {
  render() {
    return <SelectPlantProject plantProjects={this.props.plantProjects} />;
  }
}

const mapStateToProps = state => ({
  plantProjects: getAllPlantProjectsSelector(state)
});

export default connect(mapStateToProps)(SelectPlantProjectContainer);

SelectPlantProjectContainer.propTypes = {
  plantProjects: PropTypes.object
};

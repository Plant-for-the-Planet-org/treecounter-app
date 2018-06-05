import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  selectedPlantProjectSelector,
  selectedTpoSelector
} from '../../selectors';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import DonateTrees from '../../components/DonateTrees/DonateTress';

class DonationTreesContainer extends Component {
  render() {
    return (
      <DonateTrees
        selectedProject={this.props.selectedProject}
        selectedTpo={this.props.selectedTpo}
      />
    );
  }
}

const mapStateToProps = state => ({
  selectedProject: selectedPlantProjectSelector(state),
  selectedTpo: selectedTpoSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectPlantProjectAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  DonationTreesContainer
);

DonationTreesContainer.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  selectPlantProjectAction: PropTypes.func
};

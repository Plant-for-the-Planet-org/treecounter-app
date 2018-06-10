import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  selectedPlantProjectSelector,
  selectedTpoSelector,
  currentUserProfileSelector
} from '../../selectors';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import GiftTrees from '../../components/GiftTrees';

class GiftTreesContainer extends Component {
  componentDidMount() {
    this.props.selectPlantProjectAction(1);
  }

  render() {
    return (
      <GiftTrees
        selectedProject={this.props.selectedProject}
        selectedTpo={this.props.selectedTpo}
        currentUserProfile={this.props.currentUserProfile}
      />
    );
  }
}

const mapStateToProps = state => ({
  selectedProject: selectedPlantProjectSelector(state),
  selectedTpo: selectedTpoSelector(state),
  currentUserProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectPlantProjectAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftTreesContainer);

GiftTreesContainer.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object,
  selectPlantProjectAction: PropTypes.func
};

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  selectedPlantProjectSelector,
  selectedTpoSelector
} from '../../selectors';
import { updateRoute } from '../../helpers/routerHelper';
import PlantProjectFull from '../../components/PlantProjects/PlantProjectFull';

import {
  clearPlantProject,
  selectPlantProjectAction
} from '../../actions/selectPlantProjectAction';

class SelectedPlantProjectContainer extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.selectProject = this.selectProject.bind(this);
  }
  componentDidMount() {
    //  this.props.selectPlantProjectAction(1);
    console.log(this.props.navigation);
  }

  onTabChange(title) {
    // this.props.navigation.setParams({ titleParam: title });
  }
  goBack() {
    const { navigation } = this.props;
    this.props.clearPlantProject();
    updateRoute('app_donateTrees', navigation, 1);
  }
  selectProject(id) {
    const { navigation } = this.props;
    this.props.selectPlantProjectAction(id);
    updateRoute('app_donateTrees', navigation, 1);
  }
  render() {
    if (this.props.selectedProject) {
      return (
        <PlantProjectFull
          plantProject={this.props.selectedProject}
          tpoName={this.props.selectedTpo ? this.props.selectedTpo.name : null}
          showGoback={true}
          onBackClick={this.goBack}
          selectProject={id => this.selectProject(id)}
        />
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  selectedProject: selectedPlantProjectSelector(state),
  selectedTpo: selectedTpoSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearPlantProject,
      selectPlantProjectAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectedPlantProjectContainer
);

SelectedPlantProjectContainer.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  clearPlantProject: PropTypes.func
};

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  selectedPlantProjectSelector,
  selectedTpoSelector,
  currentUserProfileSelector
} from '../../selectors';
import { updateStaticRoute } from '../../helpers/routerHelper';
import PlantProjectFull from '../../components/PlantProjects/PlantProjectFull';

import {
  clearPlantProject,
  selectPlantProjectAction
} from '../../actions/selectPlantProjectAction';

class SelectedPlantProjectContainer extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.selectProject = this.selectProject.bind(this);
  }
  componentDidMount() {
    //  this.props.selectPlantProjectAction(1);
  }

  onTabChange(/* title */) {
    // this.props.navigation.setParams({ titleParam: title });
  }
  selectProject(id) {
    const { navigation } = this.props;
    this.props.selectPlantProjectAction(id);
    if (navigation) {
      updateStaticRoute(
        'app_donate_detail',
        navigation,
        navigation.getParam('userForm')
      );
    }
  }
  render() {
    if (this.props.selectedProject) {
      return (
        <PlantProjectFull
          {...this.props}
          plantProject={this.props.selectedProject}
          tpoName={this.props.selectedTpo ? this.props.selectedTpo.name : null}
          selectProject={id => this.selectProject(id)}
          currentUserProfile={this.props.currentUserProfile}
        />
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  selectedProject: selectedPlantProjectSelector(state),
  selectedTpo: selectedTpoSelector(state),
  currentUserProfile: currentUserProfileSelector(state)
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

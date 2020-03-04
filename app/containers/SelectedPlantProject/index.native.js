import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  selectedPlantProjectIdSelector,
  selectedPlantProjectSelector,
  selectedTpoSelector,
  currentUserProfileSelector
} from '../../selectors';
import { updateStaticRoute } from '../../helpers/routerHelper';
import PlantProjectFull from '../../components/PlantProjects/PlantProjectFull';
import { loadProject } from '../../actions/loadTposAction';
import {
  clearPlantProject,
  selectPlantProjectAction
} from '../../actions/selectPlantProjectAction';

const SelectedPlantProjectContainer = props => {
  if (!props.selectedProject) {
    if (props.selectedPlantProjectId) {
      let project = props.loadProject(
        { id: props.selectedPlantProjectId },
        { loading: true }
      );
      console.log('FF Found ID from Project List', project);
    }
    if (props.navigation.state.params.projectName) {
      let project = props.loadProject(
        { id: props.navigation.state.params.projectName },
        { loading: true }
      );
      console.log('FF Found ID from Deep Linking', project);
    }
  }
  selectProject = id => {
    const { navigation } = props;
    props.selectPlantProjectAction(id);
    if (navigation) {
      updateStaticRoute('app_donate_detail', navigation, {
        id: id,
        userForm: navigation.getParam('userForm'),
        giftMethod: navigation.getParam('giftMethod')
      });
    }
  };
  return props.selectedProject ? (
    <PlantProjectFull
      {...props}
      plantProject={props.selectedProject}
      tpoName={props.selectedTpo ? props.selectedTpo.name : null}
      selectProject={id => selectProject(id)}
      currentUserProfile={props.currentUserProfile}
    />
  ) : (
    alert('Not Found')
  );
};
SelectedPlantProjectContainer.navigationOptions = () => ({
  headerMode: 'none'
});

const mapStateToProps = state => ({
  selectedProject: selectedPlantProjectSelector(state),
  selectedTpo: selectedTpoSelector(state),
  currentUserProfile: currentUserProfileSelector(state),
  selectedPlantProjectId: selectedPlantProjectIdSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearPlantProject,
      selectPlantProjectAction,
      loadProject
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedPlantProjectContainer);

SelectedPlantProjectContainer.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  clearPlantProject: PropTypes.func
};

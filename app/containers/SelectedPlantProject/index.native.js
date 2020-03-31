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
  const getProjectDetails = async (projectSlug) => {
    if (projectSlug) {
      const project = await props.loadProject(
        { id: projectSlug || props.selectedPlantProjectId },
        { loading: true }
      );
      props.selectPlantProjectAction(project.id);
    } else {
      props.loadProject(
        { id: props.selectedPlantProjectId },
        { loading: true }
      );
    }
  };
  React.useEffect(() => {
    getProjectDetails(props.navigation.state.params.projectName);
  }, [props.navigation.state.params.projectName]);
  const selectProject = id => {
    const { navigation } = props;
    props.selectPlantProjectAction(id);
    let newContext = props.navigation.getParam('context');
    newContext.plantProject = {
      currency: props.selectedProject.currency,
      amountPerTree: props.selectedProject.treeCost,
      plantProjectID: id
    }

    if (navigation) {
      updateStaticRoute('app_donate_detail', navigation, {
        id: id,
        userForm: navigation.getParam('userForm'),
        giftMethod: navigation.getParam('giftMethod'),
        context: newContext
      });
    }
  };

  return (
    <PlantProjectFull
      {...props}
      plantProject={props.selectedProject}
      tpoName={props.selectedTpo ? props.selectedTpo.name : null}
      selectProject={id => selectProject(id)}
      currentUserProfile={props.currentUserProfile}
    />
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

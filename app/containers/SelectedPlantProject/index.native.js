import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadProject } from '../../actions/loadTposAction';
import { clearPlantProject, selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import { setDonationContext, setSelectedProjectDetails } from '../../components/DonateTrees/redux/action';
import PlantProjectFull from '../../components/PlantProjects/PlantProjectFull';
import { updateStaticRoute } from '../../helpers/routerHelper';
import { currentUserProfileSelector, selectedPlantProjectIdSelector, selectedPlantProjectSelector, selectedTpoSelector } from '../../selectors';

const SelectedPlantProjectContainer = props => {
  const getProjectDetails = async projectSlug => {
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
    let context = {};
    if (newContext) {
      newContext.plantProject = {
        currency: props.selectedProject.currency,
        amountPerTree: props.selectedProject.treeCost,
        plantProjectID: id
      };
      props.setSelectedProjectDetails({
        selectedProjectDetails: {
          currency: props.selectedProject.currency,
          amountPerTree: props.selectedProject.treeCost,
          plantProjectID: id
        }
      });
      context = newContext;
    } else {
      context.contextType = 'direct';
      context.plantProject = {
        currency: props.selectedProject.currency,
        amountPerTree: props.selectedProject.treeCost,
        plantProjectID: id
      };
      props.setDonationContext('direct');
      props.setSelectedProjectDetails({
        selectedProjectDetails: {
          currency: props.selectedProject.currency,
          amountPerTree: props.selectedProject.treeCost,
          plantProjectID: id
        }
      });
    }

    if (navigation) {
      updateStaticRoute('app_donate_detail', navigation, {
        id: id,
        userForm: navigation.getParam('userForm'),
        giftMethod: navigation.getParam('giftMethod'),
        context: context
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
      donationContext={props.donationDetails}
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
  selectedPlantProjectId: selectedPlantProjectIdSelector(state),
  donationDetails: state.donations.donationDetails
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearPlantProject,
      selectPlantProjectAction,
      loadProject,
      setSelectedProjectDetails,
      setDonationContext
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

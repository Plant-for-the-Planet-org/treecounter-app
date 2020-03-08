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
import PlantProjectSingle from '../../components/PlantProjects/PlantProjectSingle';
import { loadProject } from '../../actions/loadTposAction';
import {
  clearPlantProject,
  selectPlantProjectAction
} from '../../actions/selectPlantProjectAction';

const SelectedPlantProjectContainer = props => {
  React.useEffect(() => {
    if (props.match) {
      props.loadProject(
        { id: props.match.params.projectSlug },
        { loading: true }
      );
    }
  }, [props.match.params.projectSlug]);

  const selectProject = id => {
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
    <PlantProjectSingle
      {...props}
      expanded
      plantProject={props.selectedProject}
      tpoName={props.selectedTpo ? props.selectedTpo.name : null}
      selectProject={id => selectProject(id)}
      currentUserProfile={props.currentUserProfile}
    />
  ) : null;
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

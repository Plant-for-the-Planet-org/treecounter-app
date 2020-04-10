import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCurrencies } from '../../actions/currencies';
import { loadProject } from '../../actions/loadTposAction';
import { loadUserProfile } from '../../actions/loadUserProfileAction';
import {
  clearPlantProject,
  selectPlantProjectAction
} from '../../actions/selectPlantProjectAction';
import { supportTreecounterAction } from '../../actions/supportTreecounterAction';
import { updateUserProfile } from '../../actions/updateUserProfile';
import DonateTrees from '../../components/DonateTrees';
import { debug } from '../../debug';
import { setProgressModelState } from '../../reducers/modelDialogReducer';
import {
  currenciesSelector,
  currentUserProfileSelector,
  getCurrency,
  selectedPlantProjectIdSelector,
  selectedPlantProjectSelector,
  selectedTpoSelector,
  supportedTreecounterSelector
} from '../../selectors';
import { postDirectRequest } from '../../utils/api';

class DonationTreesContainer extends Component {
  static navigationOptions = {
    header: null
  };
  UNSAFE_componentWillMount() {
    const { supportTreecounterAction, match } = this.props;
    if (match && match.params && match.params.slug) {
      postDirectRequest('/suggest.php', 'q=' + match.params.slug)
        .then(_suggestions => {
          debug('sugessions', _suggestions);
          if (
            _suggestions.data.length &&
            _suggestions.data[0].slug == match.params.slug
          ) {
            supportTreecounterAction({
              id: _suggestions.data[0].treecounterId,
              displayName: _suggestions.data[0].name
            });
          }
        })
        .catch(error => debug(error));
    } else {
      const { currentUserProfile } = this.props;
      debug(
        'current user profile and suported tree counter',
        currentUserProfile,
        this.props.supportTreecounter.treecounterId
      );
      if (currentUserProfile && !this.props.supportTreecounter.treecounterId) {
        currentUserProfile.supportedTreecounter &&
          this.props.supportTreecounterAction({
            id: currentUserProfile.supportedTreecounter.id,
            displayName: currentUserProfile.supportedTreecounter.displayName
          });
      }
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProject && !nextProps.selectedProject.tpoData) {
      this.props.loadProject({ id: nextProps.selectedProject.id });
    }
  }
  async componentDidMount() {
    let selectedProjectId = undefined;
    if (this.props.match) {
      selectedProjectId = parseInt(this.props.match.params.id);
    } else {
      selectedProjectId = this.props.selectedPlantProjectId;
    }
    selectedProjectId &&
      (await this.props.loadProject({ id: selectedProjectId }));

    if (this.props.navigation && this.props.navigation.getParam('id'))
      selectedProjectId = parseInt(this.props.navigation.getParam('id'));
    if (this.props.selectedProject && !this.props.selectedProject.tpoData) {
      await this.props.loadProject({ id: this.props.selectedProject.id });
    }

    // this causes a redraw
    typeof selectedProjectId == 'number' &&
      this.props.selectPlantProjectAction(selectedProjectId);

    if (!this.props.currencies.currencies) {
      this.props.fetchCurrencies();
    }
  }
  componentWillUnmount() {
    const { currentUserProfile } = this.props;
    debug(
      'current user profile unmounting donate trees container',
      currentUserProfile
    );
    if (currentUserProfile) {
      currentUserProfile.supportedTreecounter &&
        this.props.supportTreecounterAction({
          id: null,
          displayName: null
        });
    }
  }

  determineDefaultCurrency = () => {
    const { currentUserProfile, selectedProject } = this.props;
    const userCurrency =
      null === currentUserProfile ? null : currentUserProfile.currency;
    return null === userCurrency ? selectedProject.currency : userCurrency;
  };

  render() {
    if (this.props.match) {
      const {
        params: { id }
      } = this.props.match;
      if (id && !this.props.selectedProject) return null;
    }

    return this.props.selectedProject ? (
      <DonateTrees
        currencies={this.props.currencies}
        plantProjectClear={this.props.clearPlantProject}
        selectedProject={this.props.selectedProject}
        selectedTpo={this.props.selectedTpo}
        setProgressModelState={this.props.setProgressModelState}
        supportTreecounter={this.props.supportTreecounter}
        updateUserProfile={this.props.updateUserProfile}
        navigation={this.props.navigation}
        context={this.props.navigation.getParam('context') || {}}
        // context={{
        //   contextType: this.props.contextType,
        //   giftDetails: this.props.giftDetails,
        //   projectDetails: this.props.projectDetails,
        //   supportTreeCounterDetails: this.props.supportTreeCounterDetails,
        // }}
        determineDefaultCurrency={() => this.determineDefaultCurrency()}
      />
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    globalCurrency: getCurrency(state),
    selectedProject: selectedPlantProjectSelector(state),
    selectedTpo: selectedTpoSelector(state),
    currentUserProfile: currentUserProfileSelector(state),
    supportTreecounter: supportedTreecounterSelector(state),
    currencies: currenciesSelector(state),
    selectedPlantProjectId: selectedPlantProjectIdSelector(state),
    contextType: state.donations.contextType,
    giftDetails: state.donations.giftDetails,
    projectDetails: state.donations.projectDetails,
    supportTreeCounterDetails: state.donations.supportTreeCounterDetails
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      supportTreecounterAction,
      selectPlantProjectAction,
      fetchCurrencies,
      loadProject,
      clearPlantProject,
      setProgressModelState,
      loadUserProfile,
      updateUserProfile
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DonationTreesContainer);

DonationTreesContainer.propTypes = {
  selectedProject: PropTypes.object,
  navigation: PropTypes.any,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object,
  currencies: PropTypes.object,
  selectPlantProjectAction: PropTypes.func,
  fetchCurrencies: PropTypes.func,
  clearPlantProject: PropTypes.func,
  supportTreecounter: PropTypes.object,
  setProgressModelState: PropTypes.func,
  loadUserProfile: PropTypes.func,
  updateUserProfile: PropTypes.func,
  match: PropTypes.any
};

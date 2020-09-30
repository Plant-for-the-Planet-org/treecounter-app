import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../../actions/currencies';
import {
  createPaymentDonation,
  createPaymentGift,
  paymentClear
} from '../../actions/donateAction';
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
import { updateRoute } from '../../helpers/routerHelper';
import { setProgressModelState } from '../../reducers/modelDialogReducer';
import { getPaymentStatus } from '../../reducers/paymentStatus';
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
import PropTypes from 'prop-types';

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
            debug('support treecounter suggestions', _suggestions.data[0]);
            _suggestions.data[0].type != 'tpo' &&
              supportTreecounterAction({
                id: _suggestions.data[0].treecounterId,
                type: _suggestions.data[0].type,
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
            type: currentUserProfile.supportedTreecounter.type,
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
  onTabChange = title => this.props.navigation.setParams({ titleParam: title });

  updateRoute = (routeName, id) =>
    this.props.route(routeName, id, this.props.navigation);

  donate = (donationContribution, plantProjectId, profile) =>
    this.props.donate(donationContribution, plantProjectId, profile);

  render() {
    if (this.props.match) {
      const {
        params: { id }
      } = this.props.match;
      if (id && !this.props.selectedProject) return null;
    }
    return (
      <DonateTrees
        ref={'donateTreesContainer'}
        currencies={this.props.currencies}
        donate={(donationContribution, plantProjectId, profile) =>
          this.props.donate(donationContribution, plantProjectId, profile)
        }
        createPaymentDonation={this.props.createPaymentDonation}
        createPaymentGift={this.props.createPaymentGift}
        onTabChange={title => this.onTabChange(title)}
        paymentClear={this.props.paymentClear}
        paymentStatus={this.props.paymentStatus}
        plantProjectClear={this.props.clearPlantProject}
        selectedProject={this.props.selectedProject}
        selectedTpo={this.props.selectedTpo}
        setProgressModelState={this.props.setProgressModelState}
        supportTreecounter={this.props.supportTreecounter}
        updateRoute={this.updateRoute}
        updateUserProfile={this.props.updateUserProfile}
        {...this.props}
        navigation={this.props.navigation}
      />
    );
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
    paymentStatus: getPaymentStatus(state),
    selectedPlantProjectId: selectedPlantProjectIdSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      supportTreecounterAction,
      selectPlantProjectAction,
      fetchCurrencies,
      paymentClear,
      loadProject,
      clearPlantProject,
      setProgressModelState,
      loadUserProfile,
      updateUserProfile,
      createPaymentDonation,
      createPaymentGift,
      route: (routeName, id, navigation) => dispatch =>
        updateRoute(routeName, navigation || dispatch, id)
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
  paymentStatus: PropTypes.object,
  selectPlantProjectAction: PropTypes.func,
  paymentClear: PropTypes.func,
  donate: PropTypes.func,
  gift: PropTypes.func,
  fetchCurrencies: PropTypes.func,
  clearPlantProject: PropTypes.func,
  supportTreecounter: PropTypes.object,
  setProgressModelState: PropTypes.func,
  loadUserProfile: PropTypes.func,
  route: PropTypes.func,
  updateUserProfile: PropTypes.func,
  match: PropTypes.any,
  createPaymentDonation: PropTypes.func,
  createPaymentGift: PropTypes.func
};

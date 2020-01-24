import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { supportTreecounterAction } from '../../actions/supportTreecounterAction';
import {
  selectedPlantProjectSelector,
  selectedTpoSelector,
  currentUserProfileSelector,
  currenciesSelector,
  supportedTreecounterSelector,
  getCurrency
} from '../../selectors';
import {
  selectPlantProjectAction,
  clearPlantProject
} from '../../actions/selectPlantProjectAction';

import { updateUserProfile } from '../../actions/updateUserProfile';
import { loadUserProfile } from '../../actions/loadUserProfileAction';
import { fetchCurrencies } from '../../actions/currencies';
import {
  paymentClear,
  createPaymentGift,
  createPaymentDonation
} from '../../actions/donateAction';
import { loadProject } from '../../actions/loadTposAction';
import { setProgressModelState } from '../../reducers/modelDialogReducer';

import { updateRoute } from '../../helpers/routerHelper';
import DonateTrees from '../../components/DonateTrees';
import { getPaymentStatus } from '../../reducers/paymentStatus';
import { postDirectRequest } from '../../utils/api';

class DonationTreesContainer extends PureComponent {
  componentWillMount() {
    const { supportTreecounterAction, match } = this.props;
    if (match && match.params && match.params.slug) {
      postDirectRequest('/suggest', 'q=' + match.params.slug)
        .then(_suggestions => {
          console.log('sugessions', _suggestions);
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
        .catch(error => console.log(error));
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProject && !nextProps.selectedProject.tpoData) {
      this.props.loadProject({ id: nextProps.selectedProject.id });
    }
  }
  componentDidMount() {
    let selectedProjectId = undefined;
    if (this.props.match) {
      selectedProjectId = parseInt(this.props.match.params.id);
    }
    if (this.props.navigation.getParam('id'))
      selectedProjectId = parseInt(this.props.navigation.getParam('id'));
    if (this.props.selectedProject && !this.props.selectedProject.tpoData) {
      this.props.loadProject({ id: this.props.selectedProject.id });
    }
    console.log(
      ' in donation got selectedPlant project',
      selectedProjectId,
      this.props.navigation.getParam('id')
    );
    // this causes a redraw
    typeof selectedProjectId == 'number' &&
      this.props.selectPlantProjectAction(selectedProjectId);

    if (!this.props.currencies.currencies) {
      this.props.fetchCurrencies();
    }
  }
  onTabChange = title => this.props.navigation.setParams({ titleParam: title });

  updateRoute = (routeName, id) =>
    this.props.route(routeName, id, this.props.navigation);

  donate = (donationContribution, plantProjectId, profile) =>
    this.props.donate(donationContribution, plantProjectId, profile);

  render() {
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
    paymentStatus: getPaymentStatus(state)
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

export default connect(mapStateToProps, mapDispatchToProps)(
  DonationTreesContainer
);

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

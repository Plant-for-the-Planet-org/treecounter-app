import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  selectedPlantProjectSelector,
  selectedTpoSelector,
  currentUserProfileSelector,
  currenciesSelector,
  supportedTreecounterSelector
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
import { setProgressModelState } from '../../reducers/modelDialogReducer';

import { updateRoute } from '../../helpers/routerHelper';
import DonateTrees from '../../components/DonateTrees';
import { getPaymentStatus } from '../../reducers/paymentStatus';

class DonationTreesContainer extends Component {
  componentDidMount() {
    let selectedProjectId = undefined;
    if (this.props.match) {
      selectedProjectId = parseInt(this.props.match.params.id);
    }
    typeof selectedProjectId == 'number' &&
      this.props.selectPlantProjectAction(selectedProjectId);
    this.props.fetchCurrencies();
    // console.log('In donate Tree Route' + this.props.navigation);
    // console.log(this.props.navigation);
  }

  onTabChange(title) {
    this.props.navigation.setParams({ titleParam: title });
  }
  render() {
    let flag = this.props.currentUserProfile ? true : false;
    // console.log('donate tree called');
    return (
      <DonateTrees
        ref={'donateTreesContainer'}
        selectedProject={this.props.selectedProject}
        selectedTpo={this.props.selectedTpo}
        currentUserProfile={this.props.currentUserProfile}
        currencies={this.props.currencies}
        donate={(donationContribution, plantProjectId, profile) =>
          this.props.donate(donationContribution, plantProjectId, profile)
        }
        createPaymentDonation={this.props.createPaymentDonation}
        createPaymentGift={this.props.createPaymentGift}
        updateUserProfile={this.props.updateUserProfile}
        onTabChange={title => this.onTabChange(title)}
        supportTreecounter={this.props.supportTreecounter}
        paymentStatus={this.props.paymentStatus}
        paymentClear={this.props.paymentClear}
        setProgressModelState={this.props.setProgressModelState}
        plantProjectClear={this.props.clearPlantProject}
        loadUserProfile={this.props.loadUserProfile}
        updateRoute={(routeName, id) =>
          this.props.route(routeName, id, this.props.navigation)
        }
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
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
      selectPlantProjectAction,
      fetchCurrencies,
      paymentClear,
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

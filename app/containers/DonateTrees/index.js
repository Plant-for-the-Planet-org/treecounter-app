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
import { loadUserProfile } from '../../actions/loadUserProfileAction';
import { fetchCurrencies } from '../../actions/currencies';
import { donate, paymentClear } from '../../actions/donateAction';
import { setProgressModelState } from '../../reducers/modelDialogReducer';

import DonateTrees from '../../components/DonateTrees';
import { getPaymentStatus } from '../../reducers/paymentStatus';

class DonationTreesContainer extends Component {
  componentDidMount() {
    //  this.props.selectPlantProjectAction(1);
    this.props.fetchCurrencies();
    console.log('In donate Tree Route' + this.props.navigation);
    console.log(this.props.navigation);
  }

  onTabChange(title) {
    this.props.navigation.setParams({ titleParam: title });
  }
  render() {
    let flag = this.props.currentUserProfile ? true : false;
    console.log('donate tree called');
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
        onTabChange={title => this.onTabChange(title)}
        supportTreecounter={this.props.supportTreecounter}
        paymentStatus={this.props.paymentStatus}
        paymentClear={this.props.paymentClear}
        setProgressModelState={this.props.setProgressModelState}
        plantProjectClear={this.props.clearPlantProject}
        loadUserProfile={this.props.loadUserProfile}
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
      donate,
      paymentClear,
      clearPlantProject,
      setProgressModelState,
      loadUserProfile
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  DonationTreesContainer
);

DonationTreesContainer.propTypes = {
  selectedProject: PropTypes.object,
  navigation: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object,
  currencies: PropTypes.object,
  paymentStatus: PropTypes.object,
  selectPlantProjectAction: PropTypes.func,
  paymentClear: PropTypes.func,
  donate: PropTypes.func,
  fetchCurrencies: PropTypes.func,
  clearPlantProject: PropTypes.func,
  supportTreecounter: PropTypes.object,
  setProgressModelState: PropTypes.func,
  loadUserProfile: PropTypes.func
};

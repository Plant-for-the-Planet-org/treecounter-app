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
import { fetchCurrencies } from '../../actions/currencies';
import { donate, paymentClear } from '../../actions/donateAction';

import DonateTrees from '../../components/DonateTrees';
import { getPaymentStatus } from '../../reducers/paymentStatus';

class DonationTreesContainer extends Component {
  componentDidMount() {
    // this.props.selectPlantProjectAction(1);
    this.props.fetchCurrencies();
  }

  render() {
    let flag = this.props.currentUserProfile ? true : false;
    return (
      <DonateTrees
        selectedProject={this.props.selectedProject}
        selectedTpo={this.props.selectedTpo}
        currentUserProfile={this.props.currentUserProfile}
        currencies={this.props.currencies}
        donate={(donationContribution, plantProjectId) =>
          this.props.donate(donationContribution, plantProjectId, flag)
        }
        supportTreecounter={this.props.supportTreecounter}
        paymentStatus={this.props.paymentStatus}
        paymentClear={this.props.paymentClear}
        plantProjectClear={this.props.clearPlantProject}
      />
    );
  }
}

const mapStateToProps = state => ({
  selectedProject: selectedPlantProjectSelector(state),
  selectedTpo: selectedTpoSelector(state),
  currentUserProfile: currentUserProfileSelector(state),
  supportTreecounter: supportedTreecounterSelector(state),
  currencies: currenciesSelector(state),
  paymentStatus: getPaymentStatus(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectPlantProjectAction,
      fetchCurrencies,
      donate,
      paymentClear,
      clearPlantProject
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  DonationTreesContainer
);

DonationTreesContainer.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object,
  currencies: PropTypes.object,
  paymentStatus: PropTypes.object,
  selectPlantProjectAction: PropTypes.func,
  paymentClear: PropTypes.func,
  donate: PropTypes.func,
  fetchCurrencies: PropTypes.func,
  clearPlantProject: PropTypes.func,
  supportTreecounter: PropTypes.object
};

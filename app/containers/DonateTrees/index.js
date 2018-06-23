import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  selectedPlantProjectSelector,
  selectedTpoSelector,
  currentUserProfileSelector,
  currenciesSelector
} from '../../selectors';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import { fetchCurrencies } from '../../actions/currencies';
import { donate } from '../../actions/donateAction';

import DonateTrees from '../../components/DonateTrees/DonateTrees';

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
      />
    );
  }
}

const mapStateToProps = state => ({
  selectedProject: selectedPlantProjectSelector(state),
  selectedTpo: selectedTpoSelector(state),
  currentUserProfile: currentUserProfileSelector(state),
  currencies: currenciesSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { selectPlantProjectAction, fetchCurrencies, donate },
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
  selectPlantProjectAction: PropTypes.func,
  donate: PropTypes.func,
  fetchCurrencies: PropTypes.func
};

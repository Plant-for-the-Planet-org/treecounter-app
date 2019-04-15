import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateRoute } from '../../helpers/routerHelper';
import NavigationEvents from './importNavigationEvents';

import {
  selectedPlantProjectSelector,
  selectedTpoSelector,
  currentUserProfileSelector,
  currenciesSelector
} from '../../selectors';
import {
  selectPlantProjectAction,
  clearPlantProject
} from '../../actions/selectPlantProjectAction';
import { fetchCurrencies } from '../../actions/currencies';
import { gift, paymentClear } from '../../actions/donateAction';

import GiftTrees from '../../components/GiftTrees';
import { getPaymentStatus } from '../../reducers/paymentStatus';

class GiftTreesContainer extends Component {
  constructor(props) {
    super(props);
    this.openProjects = this.openProjects.bind(this);
    this.state = { reloadTab: true };
  }
  componentDidMount() {
    this.props.fetchCurrencies();
  }
  openProjects(formValue, type) {
    //  console.log('in gif tree', formValue);
    let title = '';
    if (formValue.firstname) {
      title = formValue.firstname + ' ' + formValue.lastname;
    } else {
      title = formValue.name;
    }
    if (this.props.navigation) {
      updateRoute('app_gift_projects', this.props.navigation, 0, {
        userForm: formValue,
        giftMethod: type,
        titleParam: 'Gift Trees To ' + title
      });
    }
  }

  render() {
    let flag = this.props.currentUserProfile ? true : false;
    return [
      this.props.navigation ? (
        <NavigationEvents
          onWillFocus={payload => {
            this.setState({ reloadTab: true });
          }}
          onWillBlur={payload => {
            this.setState({ reloadTab: false });
          }}
          key="navigation-events"
        />
      ) : null,
      this.state.reloadTab ? (
        <GiftTrees
          selectedProject={this.props.selectedProject}
          selectedTpo={this.props.selectedTpo}
          currentUserProfile={this.props.currentUserProfile}
          currencies={this.props.currencies}
          gift={(donationContribution, plantProjectId) =>
            this.props.gift(donationContribution, plantProjectId, flag)
          }
          openProjects={this.openProjects}
          paymentStatus={this.props.paymentStatus}
          paymentClear={this.props.paymentClear}
          plantProjectClear={this.props.clearPlantProject}
        />
      ) : null
    ];
  }
}

const mapStateToProps = state => ({
  selectedProject: selectedPlantProjectSelector(state),
  selectedTpo: selectedTpoSelector(state),
  currentUserProfile: currentUserProfileSelector(state),
  currencies: currenciesSelector(state),
  paymentStatus: getPaymentStatus(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectPlantProjectAction,
      fetchCurrencies,
      gift,
      paymentClear,
      clearPlantProject
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftTreesContainer);

GiftTreesContainer.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object,
  currencies: PropTypes.object,
  paymentStatus: PropTypes.object,
  selectPlantProjectAction: PropTypes.func,
  gift: PropTypes.func,
  fetchCurrencies: PropTypes.func,
  paymentClear: PropTypes.func,
  clearPlantProject: PropTypes.func,
  navigation: PropTypes.any
};

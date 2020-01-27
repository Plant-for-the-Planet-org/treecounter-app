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
import { createPaymentGift, paymentClear } from '../../actions/donateAction';

import GiftTrees from '../../components/GiftTrees';
import { getPaymentStatus } from '../../reducers/paymentStatus';

import i18n from '../../locales/i18n';

class GiftTreesContainer extends Component {
  constructor(props) {
    super(props);
    this.openProjects = this.openProjects.bind(this);
    this.state = { reloadTab: true };
  }
  componentDidMount() {
    if (!this.props.currencies.currencies) {
      this.props.fetchCurrencies();
    }
  }
  openProjects(formValue, type) {
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
        titleParam: i18n.t('label.gift_trees_to', {
          user: title
        })
      });
    }
  }

  render() {
    // let flag = this.props.currentUserProfile ? true : false;
    return [
      this.props.navigation ? (
        <NavigationEvents
          onWillFocus={
            (/* payload */) => {
              this.setState({ reloadTab: true });
            }
          }
          onWillBlur={
            (/* payload */) => {
              this.setState({ reloadTab: false });
            }
          }
          key="navigation-events"
        />
      ) : null,
      this.state.reloadTab ? (
        <GiftTrees
          selectedProject={this.props.selectedProject}
          selectedTpo={this.props.selectedTpo}
          currentUserProfile={this.props.currentUserProfile}
          currencies={this.props.currencies}
          createPaymentGift={this.props.createPaymentGift}
          openProjects={this.openProjects}
          paymentStatus={this.props.paymentStatus}
          paymentClear={this.props.paymentClear}
          plantProjectClear={this.props.clearPlantProject}
          key="gift-trees"
          navigation={this.props.navigation}
          context={this.props.match ? this.props.match.params : null}
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
      createPaymentGift,
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
  createPaymentGift: PropTypes.func,
  fetchCurrencies: PropTypes.func,
  paymentClear: PropTypes.func,
  clearPlantProject: PropTypes.func,
  navigation: PropTypes.any,
  match: PropTypes.any
};

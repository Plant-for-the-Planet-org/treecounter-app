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
import {
  setDonationDetails,
  setDonorDetails,
  setPaymentDetails,
  setPaymentResponse,
  setPledgeDetails,
  setSelectedProjectDetails,
  createDonation,
  clearDonationReducer,
  donationPay
} from '../../components/DonateTrees/redux/action';
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
  state = {
    currency: ''
  };
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
    // if (nextProps.globalCurrency.currency !== this.state.currency) {
    //   this.setState({ currency: nextProps.globalCurrency.currency })
    // }
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
    return null === userCurrency
      ? this.state.currency
        ? this.state.currency
        : selectedProject.currency
      : this.state.currency
        ? this.state.currency
        : userCurrency;
  };

  render() {
    if (this.props.match) {
      const {
        params: { id }
      } = this.props.match;
      if (id && !this.props.selectedProject) return null;
    }

    const paymentSetup =
    {
      taxDeductionCountries: [
        'DE',
        'US',
        'ES',
        'MX',
        'UK'
      ],
      defaultCountry: 'DE',
      treeCountOptions: {
        fixedTreeCountOptions: [
          10,
          20,
          50,
          100,
          150,
          200
        ],
        fixedDefaultTreeCount: 50,
        variableDefaultTreeCount: 150
      },
      accounts: {
        de: {
          gateways: {
            stripe: {
              authorization: {
                accountId: 'acct_1DYCMDD2OpW2f42N',
                stripePublishableKey: 'pk_test_zOadi2MBKX0gATOBvc3fzdRY00SLVj1YvJ'
              },
              mode: 'production',
              methods: [
                'sepa',
                'apple_pay',
                'google_pay'
              ]
            },
            paypal: {
              authorization: {
                client_id: 'Ac6akWq63eXCG6hd4T28bORJr9io1RMHk32Vw9Y1ixFMZdVKbom_S-fTMOzj-EZbSxZ7om-Ux1ZvbKmu'
              },
              mode: 'production'
            }
          }
        }
      }
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
        // context={this.props.navigation.getParam('context') || {}}
        context={{
          contextType: this.props.contextType,
          giftDetails: this.props.giftDetails,
          projectDetails: this.props.projectDetails,
          supportTreeCounterDetails: this.props.supportTreeCounterDetails,
          donationDetails: this.props.donationDetails,
          donorDetails: this.props.donorDetails,
          paymentDetails: this.props.paymentDetails,
          pledgeDetails: this.props.pledgeDetails,
          donationID: this.props.donationID
        }}
        contextActions={{
          setDonationDetails: this.props.setDonationDetails,
          setDonorDetails: this.props.setDonorDetails,
          setPaymentDetails: this.props.setPaymentDetails,
          clearDonationReducer: this.props.clearDonationReducer
        }}
        determineDefaultCurrency={() => this.determineDefaultCurrency()}
        currentUserProfile={this.props.currentUserProfile}
        createDonation={this.props.createDonation}
        donationPay={this.props.donationPay}
        globalCurrency={this.props.globalCurrency}
        paymentSetup={paymentSetup}
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
    // New states
    contextType: state.donations.contextType,
    giftDetails: state.donations.giftDetails,
    projectDetails: state.donations.projectDetails,
    supportTreeCounterDetails: state.donations.supportTreeCounterDetails,
    donationDetails: state.donations.donationDetails,
    donorDetails: state.donations.donorDetails,
    paymentDetails: state.donations.paymentDetails,
    pledgeDetails: state.donations.pledgeDetails,
    donationID: state.donations.donationID
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
      updateUserProfile,
      setDonationDetails,
      setDonorDetails,
      setPaymentDetails,
      setSelectedProjectDetails,
      setPaymentResponse,
      setPledgeDetails,
      createDonation,
      donationPay,
      clearDonationReducer
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

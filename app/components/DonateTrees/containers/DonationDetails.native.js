import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCurrencies } from "../../../actions/currencies";
import { loadProject } from "../../../actions/loadTposAction";
import { loadUserProfile } from "../../../actions/loadUserProfileAction";
import { selectPlantProjectAction } from "../../../actions/selectPlantProjectAction";
import DonateTrees from "../screens/DonationDetails.native";
import {
  setDonationDetails,
  setDonorDetails,
  setPaymentDetails,
  setPaymentResponse,
  setPledgeDetails,
  createDonation,
  clearDonationReducer,
  donationPay
} from "../redux/action";
import {
  currenciesSelector,
  currentUserProfileSelector,
  getCurrency,
  selectedPlantProjectIdSelector,
  selectedPlantProjectSelector
} from "../../../selectors";
import * as RNLocalize from "react-native-localize";
import { ActivityIndicator, View } from "react-native";

class DonationTreesContainer extends Component {
  state = {
    currency: ""
  };
  static navigationOptions = {
    header: null
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProject && !nextProps.selectedProject.tpoData) {
      this.props.loadProject({ id: nextProps.selectedProject.id });
    }
    // if (nextProps.globalCurrency.currency !== this.state.currency) {
    //   this.setState({ currency: nextProps.globalCurrency.currency })
    // }
  }
  async componentDidMount() {
    // let selectedProjectId = undefined;
    // selectedProjectId = this.props.selectedPlantProjectId;

    // selectedProjectId &&
    //   (await this.props.loadProject({ id: selectedProjectId }));
    let selectedProjectId;
    if (this.props.navigation && this.props.navigation.getParam("id"))
      selectedProjectId = parseInt(this.props.navigation.getParam("id"));

    if (this.props.selectedProject === undefined) {
      this.props.loadProject({ id: selectedProjectId });
    }

    if (
      this.props.selectedProject &&
      !this.props.selectedProject.tpoData &&
      !this.props.selectedProject.paymentSetup
    ) {
      await this.props.loadProject({ id: selectedProjectId });
    }

    // this causes a redraw
    typeof selectedProjectId == "number" &&
      this.props.selectPlantProjectAction(selectedProjectId);

    if (!this.props.currencies.currencies) {
      this.props.fetchCurrencies();
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
    return this.props.selectedProject &&
      this.props.selectedProject.paymentSetup ? (
      <DonateTrees
        currencies={this.props.currencies}
        selectedCurrency={() => this.determineDefaultCurrency()}
        globalCurrency={this.props.globalCurrency}
        selectedProject={this.props.selectedProject}
        navigation={this.props.navigation}
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
        currentUserProfile={this.props.currentUserProfile}
        createDonation={this.props.createDonation}
        donationPay={this.props.donationPay}
        userCountry={RNLocalize.getCountry()}
      />
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff"
        }}
      >
        <ActivityIndicator
          style={{ alignSelf: "center" }}
          size="large"
          color="#89b53a"
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    globalCurrency: getCurrency(state),
    selectedProject: selectedPlantProjectSelector(state),
    currentUserProfile: currentUserProfileSelector(state),
    currencies: currenciesSelector(state),
    selectedPlantProjectId: selectedPlantProjectIdSelector(state),
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
      selectPlantProjectAction,
      fetchCurrencies,
      loadProject,
      loadUserProfile,
      setDonationDetails,
      setDonorDetails,
      setPaymentDetails,
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
  currentUserProfile: PropTypes.object,
  currencies: PropTypes.object,
  selectPlantProjectAction: PropTypes.func,
  fetchCurrencies: PropTypes.func,
  loadUserProfile: PropTypes.func
};

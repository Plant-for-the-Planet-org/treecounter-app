import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setDonationDetails,
  setDonorDetails,
  setPaymentDetails,
  setPaymentResponse,
  setPledgeDetails,
  createDonation,
  donationPay
} from "../redux/action";
import PaymentDetailsNative from "../screens/PaymentDetails.native";
import { currentUserProfileSelector } from "../../../selectors/index";
const PaymentDetails = props => {
  return (
    <PaymentDetailsNative
      navigation={props.navigation}
      context={{
        contextType: props.contextType,
        giftDetails: props.giftDetails,
        projectDetails: props.projectDetails,
        supportTreeCounterDetails: props.supportTreeCounterDetails,
        donationDetails: props.donationDetails,
        donorDetails: props.donorDetails,
        paymentDetails: props.paymentDetails,
        pledgeDetails: props.pledgeDetails
      }}
      contextActions={{
        setDonationDetails: props.setDonationDetails,
        setDonorDetails: props.setDonorDetails,
        setPaymentDetails: props.setPaymentDetails
      }}
      currentUserProfile={props.currentUserProfile}
      createDonation={props.createDonation}
      donationPay={props.donationPay}
      paymentSetup={props.navigation.getParam("paymentSetup")}
    />
  );
};

const mapStateToProps = state => {
  return {
    contextType: state.donations.contextType,
    giftDetails: state.donations.giftDetails,
    projectDetails: state.donations.projectDetails,
    supportTreeCounterDetails: state.donations.supportTreeCounterDetails,
    donationDetails: state.donations.donationDetails,
    donorDetails: state.donations.donorDetails,
    paymentDetails: state.donations.paymentDetails,
    pledgeDetails: state.donations.pledgeDetails,
    currentUserProfile: currentUserProfileSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setDonationDetails,
      setDonorDetails,
      setPaymentDetails,
      setPaymentResponse,
      setPledgeDetails,
      createDonation,
      donationPay
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);

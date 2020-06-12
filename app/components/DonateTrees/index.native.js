/* eslint-disable no-underscore-dangle */
import PropTypes from "prop-types";
import React from "react";
// import PaymentSelector from '../Payment/PaymentSelector';
import { View } from "react-native";
import DonationDetails from "./screens/DonationDetails.native";

export default function DonateTrees(props) {
  const { selectedProject } = props;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DonationDetails
        currencies={props.currencies}
        selectedProject={selectedProject}
        selectedCurrency={props.determineDefaultCurrency()}
        treeCountOptions={
          selectedProject &&
          selectedProject.paymentSetup &&
          selectedProject.paymentSetup.treeCountOptions
        }
        taxDeductibleCountries={selectedProject?.taxDeductibleCountries}
        hasTaxDeduction={selectedProject?.hasTaxDeduction}
        navigation={props.navigation}
        context={props.context}
        contextActions={props.contextActions}
        currentUserProfile={props.currentUserProfile}
        createDonation={props.createDonation}
        setDonorDetails={props.contextActions.setDonorDetails}
        donationPay={props.donationPay}
        globalCurrency={props.globalCurrency}
        paymentSetup={props.paymentSetup}
        userCountry={props.userCountry}
      />
    </View>
  );
}

DonateTrees.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object,
  currencies: PropTypes.object,
  paymentClear: PropTypes.func,
  supportTreecounter: PropTypes.object,
  paymentStatus: PropTypes.object,
  plantProjectClear: PropTypes.func,
  setProgressModelState: PropTypes.func,
  loadUserProfile: PropTypes.func,
  updateRoute: PropTypes.func,
  createPaymentGift: PropTypes.func,
  createPaymentDonation: PropTypes.func
};

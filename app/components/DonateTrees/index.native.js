/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React from 'react';
// import PaymentSelector from '../Payment/PaymentSelector';
import { View } from 'react-native';
import DonationDetails from './screens/DonationDetails.native';


export default function DonateTrees(props) {
  const { selectedProject } = props;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <DonationDetails
        selectedProject={selectedProject}
        selectedCurrency={props.determineDefaultCurrency()}
        treeCountOptions={selectedProject && selectedProject.paymentSetup && selectedProject.paymentSetup.treeCountOptions}
        navigation={props.navigation}
        context={props.context}
        contextActions={props.contextActions}
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
  onTabChange: PropTypes.func,
  setProgressModelState: PropTypes.func,
  loadUserProfile: PropTypes.func,
  updateRoute: PropTypes.func,
  createPaymentGift: PropTypes.func,
  createPaymentDonation: PropTypes.func
};

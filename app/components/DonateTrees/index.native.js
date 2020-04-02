/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Linking, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
// import PaymentSelector from '../Payment/PaymentSelector';
import { View } from 'react-native';

import LoadingIndicator from '../Common/LoadingIndicator';
import DonationDetails from './DonationDetails.native';

export default function DonateTrees(props) {
  const { selectedProject } = props;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <DonationDetails
        treeCost={selectedProject.treeCost}
        selectedProject={selectedProject}
        selectedCurrency={props.determineDefaultCurrency()}
        treeCountOptions={selectedProject.paymentSetup.treeCountOptions}
        navigation={props.navigation}
        context={props.context}
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

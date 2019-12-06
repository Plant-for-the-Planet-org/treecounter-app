import React, { Component } from 'react';
import DonorDetails from '../../components/DonateTrees/DonorDetails.native';

export default class DonorDetailsContainer extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const treeCost = this.props.navigation.getParam('treeCost');
    const treeCount = this.props.navigation.getParam('treeCount');
    const selectedCurrency = this.props.navigation.getParam('selectedCurrency');
    const commissionSwitch = this.props.navigation.getParam('commissionSwitch');
    return (
      <DonorDetails
        treeCount={treeCount}
        treeCost={treeCost}
        selectedCurrency={selectedCurrency}
        commissionSwitch={commissionSwitch}
      />
    );
  }
}

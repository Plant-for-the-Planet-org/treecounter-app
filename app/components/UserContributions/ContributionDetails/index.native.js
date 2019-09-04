import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import NDVI from '../../../containers/NDVI/NDVI';
import mockDataPoints from '../../NDVI/mockDataPoints';
import UserContributions from '../../UserContributions/userContribution.native';

export default class UserContributionsDetails extends React.Component {
  render() {
    const ndviUid = this.props.contribution && this.props.contribution.ndviUid;
    return (
      <View>
        <UserContributions
          treeCount={500.0}
          location={'Yucatan, Mexico'}
          dedicatedTo={'Sagar Aryal'}
          plantedDate={'March 3,2019'}
        />
        {!!ndviUid ? <NDVI ndviUid={ndviUid} /> : null}
      </View>
    );
  }
}

UserContributionsDetails.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  navigation: PropTypes.any,
  contribution: PropTypes.object.isRequired
};

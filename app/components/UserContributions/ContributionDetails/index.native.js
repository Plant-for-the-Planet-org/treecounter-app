import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import NDVI from '../../../containers/NDVI/NDVI';
import UserContributions from '../../UserContributions/userContribution.native';
import Measurements from '../../Measurements/Measurements.native';
import Alert from '../../Measurements/Alert.native';

export default class UserContributionsDetails extends React.Component {
  render() {
    console.log(this.props.contribution, 'contribution');
    if (!this.props.contribution) {
      return null;
    }
    const hasMeasurements =
      this.props.contribution.contributionMeasurements &&
      Object.keys(this.props.contribution.contributionMeasurements).length > 0;
    const ndviUid = this.props.contribution && this.props.contribution.ndviUid;
    return (
      <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
        <UserContributions
          treeCount={500.0}
          location={'Yucatan, Mexico'}
          dedicatedTo={'Sagar Aryal'}
          plantedDate={'March 3,2019'}
        />
        {/* <Alert deletedTreeCount={100} /> */}
        {hasMeasurements ? (
          <Measurements
            measurements={this.props.contribution.contributionMeasurements}
          />
        ) : null}

        {!!ndviUid ? <NDVI ndviUid={ndviUid} /> : null}
      </ScrollView>
    );
  }
}

UserContributionsDetails.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  navigation: PropTypes.any,
  contribution: PropTypes.object.isRequired
};

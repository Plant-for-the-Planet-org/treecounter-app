import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import NDVI from '../../../containers/NDVI/NDVI';
import mockDataPoints from '../../NDVI/mockDataPoints';

export default class UserContributionsDetails extends React.Component {
  render() {
    const ndviUid = this.props.contribution && this.props.contribution.ndviUid;
    return <View>{<NDVI ndviUid={ndviUid} />}</View>;
  }
}

UserContributionsDetails.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  navigation: PropTypes.any,
  contribution: PropTypes.object.isRequired
};

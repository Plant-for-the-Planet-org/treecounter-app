import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import NDVIContainer from '../../NDVI';
import mockDataPoints from '../../NDVI/mockDataPoints';

export default class UserContributionsDetails extends React.Component {
  render() {
    return (
      <View>
        <NDVIContainer dataPoints={mockDataPoints} />
        <Text>{JSON.stringify(this.props.contribution).toString()}</Text>
      </View>
    );
  }
}

UserContributionsDetails.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  navigation: PropTypes.any,
  contribution: PropTypes.object.isRequired
};

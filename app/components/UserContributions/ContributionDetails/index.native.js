import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class UserContributionsDetails extends React.Component {
  render() {
    return (
      <View>
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

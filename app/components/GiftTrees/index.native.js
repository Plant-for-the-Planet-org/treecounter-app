import React, { Component } from 'react';
import { Text } from 'react-native';
import { PropTypes } from 'prop-types';

export default class GiftTrees extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>Gift tree UnderConstruction!!</Text>;
  }
}

GiftTrees.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object,
  currencies: PropTypes.object,
  gift: PropTypes.func,
  paymentStatus: PropTypes.object,
  paymentClear: PropTypes.func,
  plantProjectClear: PropTypes.func
};

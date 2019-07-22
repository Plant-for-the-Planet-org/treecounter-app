import React from 'react';
import PropTypes from 'prop-types';
// import i18n from '../../locales/i18n.js';
import {
  Text,
  View,
  TouchableOpacity,
  // Button,
  Animated,
  ScrollView
} from 'react-native';
import styles from '../../styles/newUserContributions/newUserContributions';
// import PrimaryButton from '../Common/Button/PrimaryButton';

export default class NewUserContributions extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  _handleIndexChange = index => this.setState({ index });

  render() {
    return (
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Text style={{ display: 'flex', flex: 1 }}>500,000</Text>
          <TouchableOpacity>
            <Text style={{ display: 'flex', flex: 1, color: 'red' }}>
              Planted
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

NewUserContributions.propTypes = {
  // userProfileId: PropTypes.number.isRequired,
  // userContributions: PropTypes.array.isRequired,
  // navigation: PropTypes.any,
  // deleteContribution: PropTypes.func
};

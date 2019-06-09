import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import styles from '../../styles/edit_profile.native';
import { Client } from 'bugsnag-react-native';

const bugsnag = new Client('6f2971a9b077662912f61ae602716afd');

export default class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasErrorOccurred: false, error: undefined, info: undefined };
  }

  componentDidCatch(error, info) {
    this.setState({ hasErrorOccurred: true, error, info });
    bugsnag.notify(error, function(report) {
      report.metadata = { info: info };
    });
  }

  render() {
    if (this.state.hasErrorOccurred) {
      return (
        <SafeAreaView style={styles.confirmDeleteContainer}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <Text style={[styles.textPara, { marginTop: 15 }]}>
              We have reported this error to our developers with a cup of
              coffee.
            </Text>
            <Text style={[styles.textPara, { marginTop: 15 }]}>
              Please close the app and restart the App
            </Text>
            <Text style={[styles.textPara, { marginTop: 15 }]}>
              Sorry for the Inconvenience caused.
            </Text>
            <Text
              style={{ color: '#fff', fontSize: 10, fontStyle: 'italic' }}
            >{`Fatal Error : ${this.state.error} + \n\n${
              this.state.info
            }`}</Text>

            <Text />
          </ScrollView>
        </SafeAreaView>
      );
    }
    return this.props.children;
  }
}

GlobalErrorBoundary.propTypes = {
  children: PropTypes.any,
  location: PropTypes.any
};

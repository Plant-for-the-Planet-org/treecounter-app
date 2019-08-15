import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import styles from '../../styles/edit_profile.native';
import i18n from '../../locales/i18n.js';
import { Client, Configuration } from 'bugsnag-react-native';
import {
  name as app_name,
  version as app_version
} from '../../../package.json';

const configuration = new Configuration();
configuration.apiKey = '6f2971a9b077662912f61ae602716afd';
configuration.codeBundleId = app_version;
bugsnag = new Client(configuration);

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
              {i18n.t('label.error_reported')}
            </Text>
            <Text style={[styles.textPara, { marginTop: 15 }]}>
              {i18n.t('label.close_and_reopen')}
            </Text>
            <Text style={[styles.textPara, { marginTop: 15 }]}>
              {i18n.t('label.sorry_inconveniences')}
            </Text>
            <Text style={{ color: '#fff', fontSize: 10, fontStyle: 'italic' }}>
              {i18n.t('label.error') +
                ` : ${this.state.error} + \n\n${this.state.info}`}
            </Text>

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

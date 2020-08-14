import React from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView, SafeAreaView } from 'react-native';
import { debug } from '../../debug';
import { context } from '../../config';
import styles from '../../styles/edit_profile.native';
import i18n from '../../locales/i18n.js';
import Bugsnag from '@bugsnag/react-native'
import { version as app_version } from '../../../package.json';

const textColor = 'white';
if (context.bugsnagApiKey) {
  Bugsnag.start({
    apiKey: context.bugsnagApiKey,
    codeBundleId: app_version
  })
}

export default class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasErrorOccurred: false, error: undefined, info: undefined };
  }

  componentDidCatch(error, info) {
    this.setState({ hasErrorOccurred: true, error, info });
    debug('GlobalErrorBoundary', error, info);

    if (context.bugsnagApiKey) {
      Bugsnag.notify(error, event => {
        event.addMetadata('info', { info: info })
      });
    }
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
            <Text
              style={{ color: textColor, fontSize: 20, fontStyle: 'italic', padding: 15 }}
            >
              {i18n.t('label.error') + ' : ' + this.state.error + '\n\n' + this.state.info }
            </Text>
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

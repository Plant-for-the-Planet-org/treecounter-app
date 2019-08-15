import React from 'react';
import PropTypes from 'prop-types';
import { infoGrey } from '../../assets';
import i18n from '../../locales/i18n.js';
import bugsnag from '@bugsnag/js';
import {
  name as app_name,
  version as app_version
} from '../../../package.json';

const bugsnagClient = bugsnag({
  apiKey: '6f2971a9b077662912f61ae602716afd',
  appVersion: app_version
});

export default class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasErrorOccurred: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasErrorOccurred: true });
    console.log(error, info);
    bugsnag.notify(error, function(report) {
      report.metadata = { info: info };
    });
  }

  render() {
    if (this.state.hasErrorOccurred) {
      // You can render any custom fallback UI
      return (
        <div className={'error-container'}>
          <img src={infoGrey} />
          <h1>{i18n.t('label.something_went_x')}</h1>
          <h4>{i18n.t('label.sorry_inconveniences')}</h4>
          <p>{i18n.t('label.error_reported')}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

GlobalErrorBoundary.propTypes = {
  children: PropTypes.any,
  location: PropTypes.any
};

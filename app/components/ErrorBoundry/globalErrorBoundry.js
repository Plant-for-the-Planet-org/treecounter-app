import React from 'react';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import { info } from '../../assets';
import { context } from '../../config';
import i18n from '../../locales/i18n.js';
import Bugsnag from '@bugsnag/js';
import { version as app_version } from '../../../package.json';

if (context.bugsnagApiKey) {
  Bugsnag.start({
    apiKey: context.bugsnagApiKey,
    appVersion: app_version
  })
}

export default class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasErrorOccurred: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasErrorOccurred: true });
    debug('GlobalErrorBoundary', error, info);

    if (context.bugsnagApiKey) {
      Bugsnag.notify(error, function(event) {
        event.addMetadata('info', { info: info })
      });
    }
  }

  render() {
    if (this.state.hasErrorOccurred) {
      // You can render any custom fallback UI
      return (
        <div className={'error-container'}>
          <img src={info} />
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

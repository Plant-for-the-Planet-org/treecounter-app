import React from 'react';
import { info } from '../../assets';
import i18n from '../../locales/i18n.js';

export default class BrowserNotSupported extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'error-container'}>
        <img src={info} />
        <br />
        <h4>{i18n.t('label.browser_not_supported')}</h4>
      </div>
    );
  }
}

BrowserNotSupported.propTypes = {};

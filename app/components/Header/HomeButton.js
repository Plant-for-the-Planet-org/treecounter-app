import React from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../locales/i18n.js';
let lng = 'en';
import { getLocalRoute } from '../../actions/apiRouting';

const HomeButton = () => (
  <Link to={getLocalRoute('app_userHome')}>
    <i className="material-icons">
      {i18n.t('label.headerlabels.home', { lng })}
    </i>
  </Link>
);

export default HomeButton;

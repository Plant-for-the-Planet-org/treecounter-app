import React from 'react';
import { Link } from 'react-router-dom';
import * as constants from '../../SupportedLanguages/en';
import { getLocalRoute } from '../../actions/apiRouting';

const HomeButton = () => (
  <Link to={getLocalRoute('app_userHome')}>
    <i className="material-icons">{constants.formStrings.home}</i>
  </Link>
);

export default HomeButton;

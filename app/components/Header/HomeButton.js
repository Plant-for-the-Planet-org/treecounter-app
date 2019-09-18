import React from 'react';
import { Link } from 'react-router-dom';

import { getLocalRoute } from '../../actions/apiRouting';
const home = 'home';
const HomeButton = () => (
  <Link to={getLocalRoute('app_userHome')}>
    <i className="material-icons">{home}</i>
  </Link>
);

export default HomeButton;

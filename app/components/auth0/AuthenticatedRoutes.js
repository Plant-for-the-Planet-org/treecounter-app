import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { getLocalRoute } from '../../actions/apiRouting';
import { useAuth0 } from './Auth0Provider';

/**
 * A Route that is only visible to authenticated users.
 *
 * Anonymous users are asked to authenticate with Auth0
 * and are then relocated back to the same page (which they can then view).
 */
export const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(
    () => {
      const fn = async () => {
        if (!isAuthenticated) {
          await loginWithRedirect({
            appState: { targetUrl: path }
          });
        }
      };
      fn();
    },
    [isAuthenticated, loginWithRedirect, path]
  );

  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired
};

/**
 * Route is only visible to non-authenticated in visitors.
 *
 * Authenticated users are relocated to Home
 */
export const PublicRoute = ({ component: Component, path, ...rest }) => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Redirect to={getLocalRoute('app_userHome')} />;
  }

  const render = props => <Component {...props} />;

  return <Route path={path} render={render} {...rest} />;
};

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired
};

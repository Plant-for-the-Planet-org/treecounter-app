import createAuth0Client from '@auth0/auth0-spa-js';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

const DEFAULT_REDIRECT_CALLBACK = args => {
  const next = (args || {}).targetUrl || window.location.pathname;
  window.history.pushState({}, document.title, next);
};

export const Auth0Context = React.createContext();

/**
 * Provides user authentication variables and functions
 *
 *  isAuthenticated,
 *  user,
 *  loading,
 *  popupOpen(),
 *  loginWithPopup(),
 *  handleRedirectCallback(),
 *  getIdTokenClaims()
 *  loginWithRedirect()
 *  getTokenSilently()
 *  getTokenWithPopup()
 *  logout()
 */
export const useAuth0 = () => useContext(Auth0Context);

/**
 * Context provider that is wrapped around the entire application,
 * so any functional component can get access to user and auth state.
 */
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
    // does history push
    await auth0Client.handleRedirectCallback();
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

Auth0Provider.propTypes = {
  children: PropTypes.any,
  onRedirectCallback: PropTypes.func
};

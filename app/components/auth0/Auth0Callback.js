// import React from 'react';

/**
 * Route handler for /auth0callback
 *
 * This is where auth0 returns the user to,
 * visited only for a split second before the onRedirectCallback
 * pushes the user to the targetUrl that initiated the login,
 * or the user's home page.

 * It's better than sending them to / which fetches data and renders a big
 * tree animation.
 *
 */
const Auth0Callback = (/*props*/) => {
  // gets location, navigation
  // ?code= encrypted appState and userProfile
  // console.log("Auth0Callback", props);
  return null;
};

export default Auth0Callback;

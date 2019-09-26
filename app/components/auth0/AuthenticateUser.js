import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '../../actions/authActions';
import { loadUserProfile } from '../../actions/loadUserProfileAction';
import { setCurrentUserProfileId } from '../../reducers/currentUserProfileIdReducer';
import { mergeEntities } from '../../reducers/entitiesReducer';
import { currentUserProfileSelector } from '../../selectors';
import { setAuth0Token } from '../../utils/auth0-tokens';
import { useAuth0 } from './Auth0Provider';

/**
 * Authenticate or logout the user with the backend API whenever Auth0 authentication changes.
 *
 * This component should be used inside of AuthProvider so it has access to the auth context.
 *
 * When auth0 isAuthenticated changes then it logs the user in or out
 * and fetches userProfile accordingly.
 */
const AuthenticateUser = ({ children }) => {
  const {
    isAuthenticated,
    user,
    getIdTokenClaims,
    getTokenSilently
  } = useAuth0();
  const userProfile = useSelector(currentUserProfileSelector);
  const dispatch = useDispatch();

  // Called whenever isAuthenticated or user or userProfile changes
  useEffect(
    () => {
      userDidChange(
        isAuthenticated,
        getIdTokenClaims,
        getTokenSilently,
        user,
        userProfile,
        dispatch
      );
    },
    [isAuthenticated, user, userProfile]
  );

  return children;
};

export default AuthenticateUser;

const userDidChange = async (
  isAuthenticated,
  getIdTokenClaims,
  getTokenSilently,
  user,
  userProfile,
  dispatch
) => {
  if (isAuthenticated) {
    if (!userProfile) {
      // Auth0 user is authenticated but our redux userProfile is not yet set.

      const claims = await getIdTokenClaims();
      const authUser = user || claims;

      // Set a temporary profile
      const userId = authUser.sub;
      dispatch(setCurrentUserProfileId(userId));
      dispatch(mergeEntities(asUserProfileEntity(userId, authUser)));

      // claims.__raw is a JWT token with the full userProfile and unique id: sub
      // eslint-disable-next-line no-underscore-dangle
      let jwt = claims.__raw;
      if (!jwt) {
        // This attribute may get removed, so fall back to fetching token
        // in an iframe.
        console.warn(`No JWT at claims.__raw, fetching ... `);
        jwt = await getTokenSilently();
      }

      if (jwt) {
        // Set the token to be used for making authenticated requests to API backend
        await setAuth0Token(jwt);
      } else {
        throw new Error(`No JWT: ${JSON.stringify(claims, null, 2)}`);
      }

      // User profile on server may or may not be different
      dispatch(loadUserProfile());
    }
  } else {
    // User is no longer authenticated so log them out
    if (userProfile) {
      dispatch(logoutUser());
    }
  }
};

/**
 * Payload for ENTITIES_MERGE to add this userProfile to the store
 * of all userProfiles.  (includes other users you look at or fetch)
 */
const asUserProfileEntity = (userId, user) => {
  return {
    result: userId,
    entities: {
      userProfile: {
        [userId]: {
          id: userId,
          image: user.picture,
          fullname: user.name,
          email: user.email
        }
      }
    }
  };
};

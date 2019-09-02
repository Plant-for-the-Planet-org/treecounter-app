import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentUserProfileId } from '../../reducers/currentUserProfileIdReducer';
import { mergeEntities } from '../../reducers/entitiesReducer';
import { currentUserProfileSelector } from '../../selectors';
import { setAuth0Token } from '../../utils/user';
import { useAuth0 } from './react-auth0';
import { logoutUser } from '../../actions/authActions';

/**
 * Authenticate or logout the user with the backend API whenever Auth0 authentication changes.
 *
 * This component should be used inside of AuthProvider so it has access to the auth context.
 *
 * When auth0 isAuthenticated changes then it logs the user in or out
 * and fetches userProfile accordingly.
 */
const AuthenticateUser = ({ children }) => {
  const { isAuthenticated, user, getIdTokenClaims } = useAuth0();
  const userProfile = useSelector(currentUserProfileSelector);
  const dispatch = useDispatch();

  // Called whenever isAuthenticated or user or userProfile changes
  useEffect(
    () => {
      userDidChange(
        isAuthenticated,
        getIdTokenClaims,
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
  user,
  userProfile,
  dispatch
) => {
  if (isAuthenticated) {
    // authenticated -> login
    if (!userProfile) {
      // Could merge userProfile into redux now
      const claims = await getIdTokenClaims();
      const authUser = user || claims;

      // unique identifier for user
      // TODO on fetch of userProfile it will need to be merged to sub not id
      const userId = authUser.sub;

      dispatch(setCurrentUserProfileId(userId));
      dispatch(mergeEntities(asUserProfileEntity(userId, authUser)));

      // claims.__raw is a JWT token with the full userProfile and unique id: sub
      // eslint-disable-next-line no-underscore-dangle
      const jwt = claims.__raw;

      if (jwt) {
        // Set the token to be used for making authenticated requests to API backend
        await setAuth0Token(jwt);
      } else {
        throw new Error(
          `No JWT claims.__raw supplied from getIdTokenClaims: ${JSON.stringify(
            claims,
            null,
            2
          )}`
        );
      }
    }
  } else {
    // not authenticated -> logout
    if (userProfile) {
      console.log('call authActions logoutUser');
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

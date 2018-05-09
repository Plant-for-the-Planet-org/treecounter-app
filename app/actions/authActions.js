import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { NotificationManager } from 'react-notifications';

import { history } from '../components/Common/BrowserRouter';
import { setUserLogIn, setUserLogOut } from '../reducers/authenticationReducer';
import { loadLoginData } from './loadLoginData';
import { getApiRoute } from '../actions/apiRouting';
import { debug } from '../debug/index';
import { setCurrentUserProfileId } from '../reducers/currentUserProfileIdReducer';
import { getLocalRoute } from './apiRouting';
import { saveItem, fetchItem, clearStorage } from '../stores/localStorage';

export function login(data) {
  const request = axios.post(getApiRoute('api_login_check'), data);

  return dispatch => {
    request
      .then(res => {
        const token = res.data.token;
        if (fetchItem('jwt') !== token) {
          saveItem('jwt', token);
        }
        // merge token data and custom data
        const payload = {
          token,
          user: { ...jwtDecode(token), ...res.data.data }
        };
        dispatch(setUserLogIn(payload));

        NotificationManager.success('Login Successful', 'Welcome', 5000);
        history.push({
          pathname: getLocalRoute('app_userHome'),
          state: { id: res.data.data.id }
        }); // TODO: understand what this is doing
      })
      .then(() => {
        dispatch(loadLoginData());
      })
      .catch(error => {
        if (
          error !== undefined &&
          error.response !== undefined &&
          error.response.status === 401
        ) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          debug(error.response.data);
          NotificationManager.error(
            error.response.data.message,
            error.response.data.code,
            5000
          );
        } else {
          NotificationManager.error(error.message, 'Login Error', 5000);
        }
      });
  };
}

export function refreshToken() {
  const request = axios.post(
    getApiRoute('api_token_refresh'),
    {},
    {
      headers: { Authorization: `Bearer ${fetchItem('jwt')}` }
    }
  );

  return dispatch => {
    request
      .then(res => {
        const token = res.data.token;
        if (fetchItem('jwt') !== token) {
          saveItem('jwt', token);
        }
        // merge token data and custom data
        const payload = {
          token,
          user: { ...jwtDecode(token), ...res.data.data }
        };
        dispatch(setUserLogIn(payload));
      })
      .then(() => {
        dispatch(loadLoginData());
      })
      .catch(() => {});
  };
}

export function logoutUser() {
  return dispatch => {
    debug('Logging out');
    clearStorage();
    dispatch(setUserLogOut());
    dispatch(setCurrentUserProfileId(null));
    history.push(getLocalRoute('app_homepage'));
  };
}

export function forgot_password(data) {
  axios
    .post(getApiRoute('auth_forgotPassword_post'), data)
    .then(res => {
      debug(res.status);
      NotificationManager.success(
        'Further details have been sent to your mail address'
      );
      history.push(getLocalRoute('app_login'));
    })
    .catch(err => debug(err));
}

export function reset_password(data) {
  data.token = fetchItem('jwt');
  axios
    .post(getApiRoute('auth_resetPassword_post'), data)
    .then(res => {
      debug(res.status);
    })
    .catch(err => debug(err));
}

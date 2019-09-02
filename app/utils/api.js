import axios from 'axios';
import { v1 as uuidv1 } from 'uuid';

// import { NotificationManager } from '../notification/PopupNotificaiton/notificationManager';
import { fetchItem, saveItem } from '../stores/localStorage';
import { getAuth0Token } from './user';
import { getApiRoute } from '../actions/apiRouting';
// import { getStore } from '../components/App/index';
// import { logoutUser } from '../actions/authActions';
import { context } from '../config';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response);
    throw error;
  }
}

function onAPIError(error) {
  //400 : INPUT_VALIDATION_ERROR dont show error balloons
  if (error.response && error.response.status === 400) {
    throw error;
  }
  // if (error.response) {
  //   NotificationManager.error(error.response.data.message, 'Error', 5000);
  // }
  if (error.response && error.response.status === 401) {
    console.error(`401`, error.response);
    // getStore().dispatch(logoutUser());
  }
  throw error;
}

function onAPIResponse(response) {
  return response;
}

async function getHeaders(authenticated = false, recaptcha) {
  let headers = {
    'X-SESSION-ID': await getSessionId()
    // 'X-VERSION-KEY': 'd3b7387a-35d8-11e9-b210-d663bd873d93'
  };
  if (recaptcha) {
    headers = {
      ...headers,
      'X-CAPTCHA-TOKEN': recaptcha
    };
  }
  if (authenticated) {
    return {
      headers: { ...headers, Authorization: `Bearer ${await getAuth0Token()}` }
    };
  } else {
    return { headers };
  }
}

async function getActivateLinkHeaders() {
  const headers = { 'X-SESSION-ID': await getSessionId() };
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${await fetchItem('activate_token')}`
    }
  };
}

export async function getSessionId() {
  return fetchItem('session_id')
    .then(sessionId => {
      if (sessionId !== undefined) {
        return sessionId;
      } else {
        const sessionId = uuidv1();
        saveItem('session_id', sessionId);
        return sessionId;
      }
    })
    .catch(() => {
      const sessionId = uuidv1();
      saveItem('session_id', sessionId);
      return sessionId;
    });
}

export async function getRequest(route, params, authenticated = false) {
  let url = await getApiRoute(route, params);
  return await axios
    .get(url, await getHeaders(authenticated))
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
}

export async function getAuthenticatedRequest(route, params) {
  return getRequest(route, params, true);
}

export async function postActivateLinkRequest(route, data, params) {
  let url = await getApiRoute(route, params);
  return await axios
    .post(url, data, await getActivateLinkHeaders())
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
}

export async function postRequest(
  route,
  data,
  params,
  authenticated = false,
  recaptcha = false
) {
  let url = await getApiRoute(route, params);
  return await axios
    .post(url, data, await getHeaders(authenticated, recaptcha))
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
}

export async function postDirectRequest(path, data, authenticated = false) {
  const { scheme, host } = context;
  const serverName = `${scheme}://${host}`;
  const url = `${serverName}${path}`;
  return await axios
    .post(url, data, await getHeaders(authenticated))
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
}

export async function postAuthenticatedRequest(route, data, params) {
  return postRequest(route, data, params, true);
}

export async function putRequest(route, data, params, authenticated = false) {
  let url = await getApiRoute(route, params);
  console.log(url);
  return await axios
    .put(url, data, await getHeaders(authenticated))
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
}

export async function putAuthenticatedRequest(route, data, params) {
  return putRequest(route, data, params, true);
}

export async function deleteRequest(route, params, authenticated = false) {
  let url = await getApiRoute(route, params);
  return await axios
    .delete(url, await getHeaders(authenticated))
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
}

export async function deleteAuthenticatedRequest(route, params) {
  return deleteRequest(route, params, true);
}

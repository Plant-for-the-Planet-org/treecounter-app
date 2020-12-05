import axios from 'axios';
import { uuidv1 } from './uuid';
import { debug } from '../debug';
import { fetchItem, saveItem } from '../stores/localStorage';
import { getAccessToken } from './user';
import { getApiRoute } from '../actions/apiRouting';
import { getStore } from '../components/App/index';
import { logoutUser } from '../actions/authActions';
import { context } from '../config';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    if (response.status === 204) {
      //debug('API response status:', response.status);
      return response;
    } else {
      if (!response.data || typeof response.data !== 'object') {
        debug('API response is not an object:', typeof response.data, response.data);
      } else {
        //debug('API response:', response.data);
        return response;
      }
    }
  }
  let error = new Error('response: ' + JSON.stringify(response));
  error.response = response;
  throw error;
}

function onAPIError(error) {
  //400 : INPUT_VALIDATION_ERROR dont show error balloons
  if (error.response && error.response.status === 400) {
    throw error;
  }
  // if (error.response) {
  //   NotificationManager.error(error.response.data ? error.response.data.message || 'Error', 'Error', 5000);
  // }
  // Unauthorized error shall logout users
  if (error.response && error.response.status === 401) {
    getStore().dispatch(logoutUser());
  }
  // Upgrade error shall logout users
  if (error.response && error.response.status === 426) {
    getStore().dispatch(logoutUser());
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
      headers: { ...headers, Authorization: `Bearer ${await getAccessToken()}` }
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
      Authorization: `Bearer ${await fetchItem('activate_token').catch(error => debug(error))}`
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
  const { api_url } = context;
  const serverName = `${api_url}`;
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

/**
 * Call external API from app like ipstack, openexchanage api etc
 * build the get url and pass as endPoint
 * @param {endPoint} params
 */
export async function getExternalRequest(params) {
  //debug('getExternalRequest:', params);
  return await axios
    .get(params.endPoint)
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
}

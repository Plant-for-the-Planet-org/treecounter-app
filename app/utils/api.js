import axios from 'axios';
import { v1 as uuidv1 } from 'uuid';

import { fetchItem, saveItem } from '../stores/localStorage';
import { getAccessToken } from './user';
import { getApiRoute } from '../actions/apiRouting';
import { getStore } from '../components/App/index';
import { logoutUser } from '../actions/authActions';
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
  if (error.response && error.response.status === 401) {
    getStore().dispatch(logoutUser());
  } else {
    throw error;
  }
}

function onAPIResponse(response) {
  return response;
}

async function getHeaders(authenticated = false) {
  const headers = { 'X-SESSION-ID': await getSessionId() };
  if (authenticated) {
    return {
      headers: { ...headers, Authorization: `Bearer ${await getAccessToken()}` }
    };
  } else {
    return { headers };
  }
}

export async function getSessionId() {
  return fetchItem('session_id')
    .then(sessionId => sessionId)
    .catch(() => {
      const sessionId = uuidv1();
      saveItem('session_id', sessionId);
      return sessionId;
    });
}

export async function getRequest(route, params, authenticated = false) {
  let url = getApiRoute(route, params);
  return await axios
    .get(url, await getHeaders(authenticated))
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
}

export async function getAuthenticatedRequest(route, params) {
  return getRequest(route, params, true);
}

export async function postRequest(route, data, params, authenticated = false) {
  let url = getApiRoute(route, params);
  return await axios
    .post(url, data, await getHeaders(authenticated))
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
  let url = getApiRoute(route, params);
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
  let url = getApiRoute(route, params);
  return await axios
    .delete(url, await getHeaders(authenticated))
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
}

export async function deleteAuthenticatedRequest(route, params) {
  return deleteRequest(route, params, true);
}

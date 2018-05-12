import axios from 'axios';

import { getJWT } from './jwtStorage';
import { getApiRoute } from '../actions/apiRouting';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response);
    throw error;
  }
}

function onAPIError(error) {
  throw error;
}

function onAPIResponse(response) {
  return response;
}

export async function getRequest(route, params) {
  let url = getApiRoute(route, params);
  let json = await axios
    .get(url)
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
  return json;
}

export async function getAuthenticatedRequest(route, params) {
  let url = getApiRoute(route, params);
  let token = await getJWT();
  let json = await axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
  return json;
}

export async function postRequest(route, data, params) {
  let url = getApiRoute(route, params);
  let json = await axios
    .post(url, data)
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
  return json;
}

export async function postAuthenticatedRequest(route, data, params) {
  let url = getApiRoute(route, params);
  let token = await getJWT();
  let json = await axios
    .post(url, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
  return json;
}

export async function putRequest(route, data, params) {
  let url = getApiRoute(route, params);
  let json = await axios
    .put(url, data)
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
  return json;
}

export async function putAuthenticatedRequest(route, data, params) {
  let url = getApiRoute(route, params);
  let token = await getJWT();
  let json = await axios
    .put(url, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
  return json;
}

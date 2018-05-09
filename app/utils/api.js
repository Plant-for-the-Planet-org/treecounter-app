import axios from 'axios';
import { getAccessToken } from './user';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function onAPIError(response) {
  return response;
}

function onAPIResponse(response) {
  return response;
}

export async function getRequest(url) {
  let json = await axios
    .get(url)
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
  return json;
}

export async function getAuthenticatedRequest(url) {
  let token = getAccessToken();
  let json = await axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError);
  return json;
}

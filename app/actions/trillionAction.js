import axios from 'axios';
import { getApiRoute } from './apiRouting';

export function trillionCampaign() {
  return axios.get(getApiRoute('treecounter_get'), {
    headers: { Authorization: `Bearer ${window.localStorage.getItem('jwt')}` }
  });
}

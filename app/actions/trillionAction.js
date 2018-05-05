import axios from 'axios';
import { getApiRoute } from './apiRouting';

export function trillionCampaign() {
  return axios.get(getApiRoute('treecounter_get'), {
    headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
  });
}

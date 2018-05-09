import axios from 'axios';
import { getApiRoute } from './apiRouting';
import { fetchItem } from '../stores/localStorage';

export function trillionCampaign() {
  return axios.get(getApiRoute('treecounter_get'), {
    headers: { Authorization: `Bearer ${fetchItem('jwt')}` }
  });
}

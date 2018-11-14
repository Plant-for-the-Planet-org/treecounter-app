import { getRequest } from '../utils/api';

export function ImprintAction() {
  return getRequest('public_imprint_get');
}

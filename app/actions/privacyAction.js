import { getRequest } from '../utils/api';

export function PrivacyAction() {
  return getRequest('public_privacy_get');
}

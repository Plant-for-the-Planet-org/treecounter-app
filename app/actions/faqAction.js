import { getAuthenticatedRequest } from '../utils/api';
import { debug } from '../debug/index';

export function FAQAction() {
  debug('Getting FAQ');
  return getAuthenticatedRequest('public_faqs_get');
}

import { getAuthenticatedRequest } from '../utils/api';

export function FAQAction() {
  return getAuthenticatedRequest('public_faqs_get');
}

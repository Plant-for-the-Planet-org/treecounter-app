import { getRequest } from '../utils/api';

export function FAQAction() {
  return getRequest('public_faqs_get');
}

import { getRequest } from '../utils/api';

export function NDVIAction(ndviUID) {
  return getRequest('public_ndvi_get', { uid: ndviUID });
}

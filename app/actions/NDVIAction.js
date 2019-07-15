import { getRequest } from '../utils/api';

export function NDVIAction(ndviUID) {
  return getRequest('ndvi', { uid: ndviUID });
}

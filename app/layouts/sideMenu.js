import { Observable } from 'rxjs/Observable';

import { getRequest, getAuthenticatedRequest } from '../utils/api';

const PublicSideMenuSchema = menuNameParam => {
  return new Observable(observe => {
    getRequest('public_menu_get', {
      category: menuNameParam,
      version: 'v1.4'
    })
      .then(({ data }) => {
        observe.next(data);
        observe.complete();
      })
      .catch(error => observe.error(error));
  });
};

const AuthenticatedSideMenuSchema = menuNameParam => {
  return new Observable(observe => {
    getAuthenticatedRequest('data_menu_get', {
      category: menuNameParam,
      version: 'v1.4'
    })
      .then(({ data }) => {
        observe.next(data);
        observe.complete();
      })
      .catch(error => observe.error(error));
  });
};

export { PublicSideMenuSchema, AuthenticatedSideMenuSchema };

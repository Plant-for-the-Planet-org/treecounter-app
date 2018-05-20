import { Observable } from 'rxjs/Observable';

import { getAuthenticatedRequest } from '../utils/api';

const TargetSchema = () =>
  new Observable(observe => {
    getAuthenticatedRequest('target_update_form')
      .then(({ data }) => {
        observe.next(data);
        observe.complete();
      })
      .catch(error => observe.error(error));
  });

export { TargetSchema };

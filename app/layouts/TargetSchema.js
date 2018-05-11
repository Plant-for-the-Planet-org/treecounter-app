import { Observable } from 'rxjs/Observable';

import { getAuthenticatedRequest } from '../utils/api';

const TargetSchema = treecounterId =>
  new Observable(observe => {
    getAuthenticatedRequest('target_update_form', {
      treecounter: treecounterId
    })
      .then(({ data }) => {
        observe.next(data);
        observe.complete();
      })
      .catch(error => observe.error(error));
  });

export { TargetSchema };

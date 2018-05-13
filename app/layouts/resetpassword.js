import { Observable } from 'rxjs/Observable';

import { getRequest } from '../utils/api';

const ResetPasswordSchema = new Observable(observe => {
  getRequest('auth_resetPassword_form')
    .then(({ data }) => {
      observe.next(data.schema);
      observe.complete();
    })
    .catch(error => observe.error(error));
});

export default ResetPasswordSchema;

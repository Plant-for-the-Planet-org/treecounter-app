import axios from 'axios';
import { Observable } from 'rxjs/Observable';

import { getApiRoute } from '../actions/apiRouting';

const ResetPasswordSchema = new Observable(observe => {
  axios
    .get(getApiRoute('auth_resetPassword_form'))
    .then(({ data }) => {
      observe.next(data.schema);
      observe.complete();
    })
    .catch(error => observe.error(error));
});

export default ResetPasswordSchema;

import { getRequest } from '../utils/api';
import { Observable } from 'rxjs/Observable';

const ForgotPasswordSchema = new Observable(observe => {
  getRequest('auth_forgotPassword_form')
    .then(({ data }) => {
      observe.next(data.schema);
      observe.complete();
    })
    .catch(error => observe.error(error));
});

export default ForgotPasswordSchema;

import { getRequest } from '../utils/api';
import { Observable } from 'rxjs/Observable';

const LoginSchema = new Observable(observe => {
  getRequest('auth_login_form')
    .then(({ data }) => {
      observe.next(data.schema);
      observe.complete();
    })
    .catch(error => observe.error(error));
});

export default LoginSchema;

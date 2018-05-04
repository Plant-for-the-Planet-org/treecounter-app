import axios from 'axios';
import { Observable } from 'rxjs/Observable';

import { getApiRoute } from '../actions/apiRouting';

const TargetSchema = treecounterId =>
  new Observable(observe => {
    axios
      .get(getApiRoute('target_update_form', { treecounter: treecounterId }), {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      })
      .then(({ data }) => {
        observe.next(data);
        observe.complete();
      })
      .catch(error => observe.error(error));
  });

export { TargetSchema };

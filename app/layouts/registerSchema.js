import axios from 'axios';
import { Observable } from 'rxjs/Observable';

import { getApiRoute } from '../actions/apiRouting';

const SignUpSchema = profileType =>
  new Observable(observe => {
    axios
      .get(getApiRoute('registration_forms'))
      .then(({ data }) => {
        if (profileType === 'tpo') {
          observe.next(data.tpo.schema);
          observe.complete();
        } else if (profileType === 'individual') {
          observe.next(data.individual.schema);
          observe.complete();
        } else if (profileType === 'organization') {
          observe.next(data.organization.schema);
          observe.complete();
        } else if (profileType === 'education') {
          observe.next(data.education.schema);
          observe.complete();
        } else if (profileType === 'company') {
          observe.next(data.company.schema);
          observe.complete();
        } else if (profileType === 'government') {
          observe.next(data.government.schema);
          observe.complete();
        }
      })
      .catch(error => observe.error(error));
  });

export { SignUpSchema };

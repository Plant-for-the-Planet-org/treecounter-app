import { getAuthenticatedrequest } from '../utils/api';
import { getApiRoute } from '../actions/apiRouting';

export function RegisterTreeSchema() {
  console.log('Getting Register Tree Form');
  const request = getAuthenticatedrequest(
    getApiRoute('plantContribution_form')
  );

  return request;
}

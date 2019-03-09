import { getAuthenticatedRequest } from '../utils/api';
import { setRecurringMonth } from '../reducers/recurringReducers';

export function fetchRecurringMonths() {
  return dispatch => {
    getAuthenticatedRequest('donationContribution_form').then(response =>
      dispatch(setRecurringMonth(response.data))
    );
  };
}

import { setSupportedTreecounterId } from '../reducers/supportedTreecounterIdReducer';

export function supportTreecounterAction(id) {
  return dispatch => {
    dispatch(setSupportedTreecounterId(id));
  };
}

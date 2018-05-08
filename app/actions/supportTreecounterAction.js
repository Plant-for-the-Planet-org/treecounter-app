import { setSupportedTreecounterId } from '../reducers/supportedTreecounterIdReducer';

export function supportTreecounterAction(treecounter) {
  return dispatch => {
    dispatch(setSupportedTreecounterId(treecounter));
  };
}

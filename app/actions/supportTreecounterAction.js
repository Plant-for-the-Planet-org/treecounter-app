import { setSupportedTreecounter } from '../reducers/supportedTreecounterReducer';

export function supportTreecounterAction(treecounter) {
  return dispatch => {
    dispatch(setSupportedTreecounter(treecounter));
  };
}

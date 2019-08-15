import {
  setSupportedTreecounter,
  clearSupportedTreecounter
} from '../reducers/supportedTreecounterReducer';

export function supportTreecounterAction(treecounter) {
  return dispatch => {
    dispatch(setSupportedTreecounter(treecounter));
  };
}

export function clearSupport() {
  return dispatch => {
    dispatch(clearSupportedTreecounter());
  };
}

import axios from 'axios';
import {normalize} from 'normalizr';

import {tpoSchema} from "../schemas/index";
import {mergeEntities} from "../reducers/entitiesReducer";
import {getApiRoute} from "../actions/apiRouting";

// TODO: unsused. consider eliminating
export function loadTpos(token) {

  const request = axios.get(
    getApiRoute('data_tpos_get'),
    {headers: {'Authorization': `Bearer ${token}`}}
  );
  return (dispatch) => {
    request.then(res => {
      dispatch(mergeEntities(normalize(res.data, [tpoSchema])));
    });
  };
}

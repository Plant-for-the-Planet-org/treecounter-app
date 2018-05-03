import axios from "axios";
import {normalize} from "normalizr";

import {tpoSchema} from "../schemas/index";
import {userProfileSchema} from "../schemas/index";
import {mergeEntities} from "../reducers/entitiesReducer";
import {setCurrentUserProfileId} from "../reducers/currentUserProfileIdReducer";
import {getApiRoute} from "../actions/apiRouting";
import {debug} from "../debug/index";

export function loadLoginData(token) {

  debug('dispatching: loadLoginData');
  const request = axios.get(
    getApiRoute('data_loginLoad_get'),
    {headers: {'Authorization': `Bearer ${token}`}}
  );
  return (dispatch) => {
    request.then(res => {
      dispatch(mergeEntities(normalize(res.data.tpos, [tpoSchema])));
      dispatch(mergeEntities(normalize(res.data.userProfile, userProfileSchema)));
      dispatch(setCurrentUserProfileId(res.data.userProfile.id));
    });
  };
}
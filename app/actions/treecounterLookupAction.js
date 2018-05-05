import axios from 'axios'
import {normalize, denormalize} from 'normalizr'

import {getApiRoute} from '../actions/apiRouting'
import {treecounterSchema} from '../schemas/index'
import {mergeEntities} from '../reducers/entitiesReducer'

export function treecounterLookupAction(treecounterId) {
  return (dispatch, getState) => {
    // the treecounter might already exist in normalized form in the redux-store
    // if so we de-normalize and just return it
    const entities = getState().entities
    if (entities.treecounter && entities.treecounter.treecounterId) {
      console.log('entities.treecounter', entities.treecounter)
      console.log('treecounter already exists')
      console.log(denormalize(entities.treecounter[treecounterId], entities, treecounterSchema))
      return Promise.resolve(denormalize(
        entities.treecounter[treecounterId],
        treecounterSchema,
        entities
      ))
    }

    console.log('treecounter does not exists')
    // the treecounter has not been fetched yet
    // so we store it in normalized form in the redux-store but return the original data
    return axios
      .get(getApiRoute('treecounter_get', {treecounter: treecounterId}))
      .then(result => {
        const treecounter = result.data
        dispatch(mergeEntities(normalize(treecounter, treecounterSchema)))
        return treecounter
      })
  }
}

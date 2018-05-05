import axios from 'axios'
import {normalize} from 'normalizr'

import {getApiRoute} from '../actions/apiRouting'
import {mergeEntities} from '../reducers/entitiesReducer'
import {treecounterSchema} from '../schemas/index'

export function followUnSubscribeAction(treecounterId) {
  console.log('un-subscribing: ', treecounterId)
  return (dispatch) => {
    axios.post(
      getApiRoute('followUnSubscribe_post'),
      {'_format': 'json', 'follow': {'followee': treecounterId}},
      {headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}}
    )
      .then(result => {
        console.log('followee un-subscribe: ', result.data)

        dispatch(mergeEntities(normalize(result.data, treecounterSchema)))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

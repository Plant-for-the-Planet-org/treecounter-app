import axios from 'axios'
import {Observable} from 'rxjs/Observable'

import {getApiRoute} from '../actions/apiRouting'

// use: https://treecounter.plant-for-the-planet.org/app_dev.php/api/doc#get--api-{_locale}-profileUpdateForm-{userProfile}
const ProfileUpdateUpSchema = userProfileId =>
  new Observable(observe => {
    axios
      .get(getApiRoute('profileUpdate_form', {userProfile: userProfileId}))
      .then(({data}) => {
          observe.next(data) // includes schema and values
          observe.complete()
      })
      .catch(error => observe.error(error))
  })

export {ProfileUpdateUpSchema}

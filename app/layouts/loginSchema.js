import axios from 'axios'
import {Observable} from "rxjs/Observable"

import {getApiRoute} from "../actions/apiRouting"

const LoginSchema = new Observable(observe => {
  axios.get(getApiRoute('auth_login_form'))
    .then(({data}) => {
      observe.next(data.schema)
      observe.complete()
    }).catch(error => observe.error(error))
})

export default LoginSchema

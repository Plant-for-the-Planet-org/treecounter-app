import axios from 'axios'
import {Observable} from "rxjs/Observable"

import {getApiRoute} from "../actions/apiRouting"

const ForgotPasswordSchema = new Observable((observe) => {
  axios.get(getApiRoute('auth_forgotPassword_form'))
    .then(({data}) => {
      observe.next(data.schema)
      observe.complete()
    }).catch(error => observe.error(error))
})

export default ForgotPasswordSchema

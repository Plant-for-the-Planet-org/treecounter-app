import axios from "axios";
import {NotificationManager} from "react-notifications";

import {getApiRoute} from "../actions/apiRouting";
import {debug} from "../debug/index";

export function userSignupRequest(userData, profileType) {
  debug(userData, profileType);
  if (userData.password.first === userData.password.second) {
    return axios.post(
      getApiRoute('register_post', {profileType: profileType}),
      userData
    )
      .then(res => {
        if (res.status === 200) {
          debug("registration successful");
          NotificationManager.success("Registration Successful", "Congrats", 5000);
          debug(res);
          history.push("/verify");
        }
      })
      .catch(err => console.log(err));
  }
  else {
    window.alert("Password Invalid");
  }
}

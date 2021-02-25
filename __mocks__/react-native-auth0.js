class Auth {
  constructor(options = {}) {}
  authorizeUrl(parameters = {}) {}
  logoutUrl(parameters = {}) {}
  exchange(parameters = {}) {}
  exchangeNativeSocial(parameters = {}) {}
  passwordRealm(parameters = {}) {}
  refreshToken(parameters = {}) {}
  passwordlessWithEmail(parameters = {}) {}
  passwordlessWithSMS(parameters = {}) {}
  loginWithEmail(parameters = {}) {}
  loginWithSMS(parameters = {}) {}
  revoke(parameters = {}) {}
  userInfo(parameters = {}) {}
  resetPassword(parameters = {}) {}
  createUser(parameters = {}) {}
}

export default class Auth0 {
  constructor(options = {}) {
    const { domain, clientId, ...extras } = options;
    this.auth = new Auth({baseUrl: domain, clientId, ...extras});
    this.options = options;
  }
  users(token) {}
};

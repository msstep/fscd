'use_strict'

class TokenStore {

  constructor() {
   this.token = ""
   this.id = 0
  }

  setToken(newToken) {
    this.token = newToken;
  }

  getToken() {
    return this.token
  }

}

const tokenStore = new TokenStore;

export default tokenStore;
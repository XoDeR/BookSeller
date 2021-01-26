class Auth {

  static authenticateUser(token) {
    localStorage.setItem("token", token);
  }

  static isUserAuthenticated() {
    return localStorage.getItem("token") !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("usrname");
  }

  static getToken() {
    return localStorage.getItem("token");
  }
}

export default Auth;
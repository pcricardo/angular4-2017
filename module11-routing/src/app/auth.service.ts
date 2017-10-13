export class AuthService {
  loggedIn = false;

  isAuhenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout( () => {
          resolve(this.loggedIn);
          console.log('isAuhenticated = ' + this.loggedIn);
        }, 800);
      }
    );
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

}


export class Auth {
  static isLogin: boolean = false;
  static uid = 0;
  static username: string = '';
  static isAdmin: boolean = false;
  static isInited = false;

  static init() {
    Auth.isLogin = localStorage.getItem('isLogin') === 'true';
    Auth.username = localStorage.getItem('username');
    Auth.isAdmin = localStorage.getItem('isAdmin') === 'true';
    Auth.uid = parseInt(localStorage.getItem('uid'), 10);
    Auth.isInited = true;
  }

  static save() {
    localStorage.setItem('isLogin', Auth.isLogin + '');
    localStorage.setItem('username', Auth.username);
    localStorage.setItem('isAdmin', Auth.isAdmin + '');
    localStorage.setItem('uid', Auth.uid.toString(10));
  }

  static setAuth(uid: number, username: string, isAdmin:boolean) {
    Auth.isLogin = true;
    Auth.username = username;
    Auth.uid = uid;
    Auth.isAdmin = isAdmin;

    Auth.save();
  }

  static getAuth() {
    if (!Auth.isInited) {
      Auth.init();
    }
    return {
      'isLogin': Auth.isLogin,
      'uid': Auth.uid,
      'username' : Auth.username,
      'isAdmin' : Auth.isAdmin
    };
  }

  static clear() {
    localStorage.clear();
  }

}

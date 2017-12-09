export class Auth {
  static isLogin:boolean = false;
  static uid:number = 0;
  static username:string = '';
  static isAdmin:boolean = false;

  static setAuth(uid: number, username: string, isAdmin:boolean) {
    Auth.isLogin = true;
    Auth.username = username;
    Auth.uid = uid;
    Auth.isAdmin = isAdmin;
    
  }

  static getAuth() {
    return {
      'isLogin': Auth.isLogin,
      'uid': Auth.uid,
      'username' : Auth.username,
      'isAdmin' : Auth.isAdmin
    };
  }
}

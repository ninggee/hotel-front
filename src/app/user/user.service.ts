import { User } from './user';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private userUrl = 'http://121.193.130.195:4567/user';

  constructor(private http: Http) {}

  getUsers(): Promise<User[]> {
    return this.http.get(this.userUrl).toPromise().then(
      res => res.json().result as User[]
    ).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

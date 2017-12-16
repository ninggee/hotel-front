import { User } from './user';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Response } from '../utils/Response';

@Injectable()
export class UserService {
  private userUrl = 'http://localhost:4567/user';

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

  getUser(id: number): Promise<User> {
    return this.http.get(this.userUrl + '/' + id).toPromise().then(
      res => res.json().result as User
    ).catch(this.handleError);
  }

  update(user: User): Promise<Response> {
    const url = `${this.userUrl}/${user.id}`;
    return this.http.post(url, JSON.stringify(user)).toPromise().then(
      res => res.json() as Response
    ).catch(this.handleError);
  }

  delete(id: number): Promise<Response> {
    const url = `${this.userUrl}/${id}`;

    return this.http.delete(url, '').toPromise().then(
      res => res.json() as Response
    ).catch(this.handleError);
  }

  addNormal(user: User): Promise<Response> {
    const url = `${this.userUrl}/add/normal`;
    return this.http.post(url, JSON.stringify(user)).toPromise().then(res =>
      res.json() as Response
    ).catch(this.handleError);
  }

  addAdmin(user: User): Promise<Response> {
    const url = `${this.userUrl}/add/admin`;
    return this.http.post(url, JSON.stringify(user)).toPromise().then(res =>
      res.json() as Response
    ).catch(this.handleError);
  }
}

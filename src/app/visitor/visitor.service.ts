import { Injectable } from '@angular/core';
import { Visitor } from './visitor';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Response } from '../utils/Response';
import {Room} from '../room/room';
@Injectable()
export class VisitorService {

  // private visitorsUrl = 'http://121.193.130.195:4567/visitor';
  private visitorsUrl = 'http://localhost:4567/visitor';

  constructor(private http: Http) { }

  getVisitors(): Promise<Visitor[]> {

    return this.http.get(this.visitorsUrl).toPromise().then(response => response.json().result as Visitor[]).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getVisitoresSlowly(): Promise<Visitor[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getVisitors()), 2000);
    });
  }
  delete(id: number): Promise<Response> {
    const url = `${this.visitorsUrl}/${id}`;
    return this.http.delete(url).toPromise().then(res => res.json() as Response).catch(this.handleError);
  }

  create(visitor: Visitor): Promise<Visitor> {
    return this.http
    // .post(this.roomsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .post( this.visitorsUrl + '/insert', JSON.stringify(visitor))
      .toPromise()
      .then(res => res.json().result as Visitor)
      /*.then(function (res) {
        console.log(res.json());
        return res.json().result as Visitor;
      })*/
      .catch(this.handleError);
  }
}

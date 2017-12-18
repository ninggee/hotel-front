import { Injectable } from '@angular/core';
import { Visitor } from './visitor';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Response } from '../utils/Response';
@Injectable()
export class VisitorService {

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

  getVisitorNumber(): Promise<Response> {
    const url = `${this.visitorsUrl}/statistics/number`;

    return this.http.get(url).toPromise().then(res => res.json() as Response).catch(this.handleError);
  }
}

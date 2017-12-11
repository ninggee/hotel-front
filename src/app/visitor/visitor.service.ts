import { Injectable } from '@angular/core';
import { Visitor } from './visitor';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
/*
  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
  }*/
}

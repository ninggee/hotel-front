import { Injectable } from '@angular/core';
import { Order } from './order';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {

  private roomsUrl = 'http://localhost:4567/reservation';

  constructor(private http: Http) { }

  getOrders(): Promise<Order[]> {

    return this.http.get(this.roomsUrl).toPromise().then(response => response.json().result as Order[]).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getOrdersSlowly(): Promise<Order[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getOrders()), 2000);
    });
  }
/*
  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
  }*/
}

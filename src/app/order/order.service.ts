import { Injectable } from '@angular/core';
import { Order } from './order';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Response } from '../utils/Response'


@Injectable()
export class OrderService {

  private roomsUrl = 'http://localhost:4567/reservation';

  constructor(private http: Http) {
  }

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

  delete(id: number): Promise<void> {
    const url = `${this.roomsUrl}/${id}`;
    // return this.http.delete(url, {headers: this.headers})
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getRoom(id: number): Promise<Order> {
    return this.getOrders().then(orders => orders.find(order => order.id === id));
  }

  update(order: Order): Promise<Order> {
    const url = `${this.roomsUrl}/${order.id}`;
    return this.http
      // .put(url, JSON.stringify(hero), {headers: this.headers})
      .put(url, JSON.stringify(order))
      .toPromise()
      .then(() => order)
      .catch(this.handleError);
  }

  getOrderNumber(): Promise<Response> {
    const url = `${this.roomsUrl}/number`;
    return this.http.get(url).toPromise().then(res => res.json() as Response).catch(this.handleError);
  }
}

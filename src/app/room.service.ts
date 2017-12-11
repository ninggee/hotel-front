import { Injectable } from '@angular/core';
import { Room } from './room';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoomService {

  private roomsUrl = 'http://localhost:4567/room';

  constructor(private http: Http) { }

  getRooms(): Promise<Room[]> {

    return this.http.get(this.roomsUrl).toPromise().then(response => response.json().result as Room[]).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getRoomesSlowly(): Promise<Room[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getRooms()), 2000);
    });
  }
/*
  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
  }*/
}

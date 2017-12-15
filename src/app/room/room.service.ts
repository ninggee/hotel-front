import { Injectable } from '@angular/core';
import { Room } from './room';
import { RequestOptions, Headers, Http } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoomService {

  private roomsUrl = 'http://localhost:4567/room';
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http, private httpClient:HttpClient) { }

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
  update(room: Room): Promise<Room> {
    const url = `${this.roomsUrl}/${room.id}`;
    return this.http
      // .put(url, JSON.stringify(hero), {headers: this.headers})
      .put(url, JSON.stringify(room))
      .toPromise()
      .then(() => room)
      .catch(this.handleError);
  }
  create(room: Room): Promise<Room> {
    return this.http
      // .post(this.roomsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .post( this.roomsUrl + '/insert', JSON.stringify(room))
      .toPromise()
      .then(res => res.json().result as Room)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.roomsUrl}/${id}`;
    // return this.http.delete(url, {headers: this.headers})
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getRoom(id: number): Promise<Room> {
    return this.getRooms().then(rooms => rooms.find(room => room.id === id));
  }
}

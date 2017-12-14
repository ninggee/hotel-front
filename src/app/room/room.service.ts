import { Injectable } from '@angular/core';
import { Room } from './room';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoomService {

  private roomsUrl = 'http://121.193.130.195:4567/room';

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
  update(room: Room): Promise<Room> {
    const url = `${this.roomsUrl}/${room.id}`;
    return this.http
      // .put(url, JSON.stringify(hero), {headers: this.headers})
      .put(url, JSON.stringify(room))
      .toPromise()
      .then(() => room)
      .catch(this.handleError);
  }
  create(name: string): Promise<Room> {
    return this.http
      // .post(this.roomsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .post( 'http://localhost:4567/insert', JSON.stringify({room_type: name}))
      .toPromise()
      .then(res => res.json().data.result as Room)
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

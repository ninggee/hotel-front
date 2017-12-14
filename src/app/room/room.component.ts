import {Component, OnInit} from '@angular/core';
import {Room} from './room';
import {RoomService} from './room.service';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-heroes',
  templateUrl: './room.component.html',
  styleUrls: [ './room.component.css' ]
})
export class RoomsComponent implements OnInit {
  title = 'Tour of Heroes';
  rooms: Room[];
  selectedRoom: Room;
  room: Room;


  constructor(
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  getRooms(): void {
    this.roomService.getRooms().then(rooms => this.rooms = rooms);
  }

  onSelect(room: Room): void {
    this.selectedRoom = room;
  }

  ngOnInit(): void {
    this.getRooms();
    this.route.paramMap
      .switchMap((params: ParamMap) => this.roomService.getRoom(+params.get('id')))
      .subscribe(room => this.room = room);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.roomService.create(name)
      .then(room => {
        this.rooms.push(room);
        this.selectedRoom = null;
      });
  }

  delete(room: Room): void {
    this.roomService
      .delete(room.id)
      .then(() => {
        this.rooms = this.rooms.filter(h => h !== room);
        if (this.selectedRoom === room) { this.selectedRoom = null; }
      });
  }

    goBack(): void {
       this.location.back();
    }

  save(): void {

    this.roomService.update(this.room)
      .then(() => this.goBack());
    }

/*  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }*/
}

import {Component, OnInit} from '@angular/core';
import {Room} from './room';
import {RoomService} from './room.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './room.component.html',
  styleUrls: [ './room.component.css' ]
})
export class RoomsComponent implements OnInit {
  title = 'Tour of Heroes';
  rooms: Room[];
  selectedRoom: Room;

  constructor(
    private roomService: RoomService,
    private router: Router
  ) { }

  getRooms(): void {
    this.roomService.getRooms().then(rooms => this.rooms = rooms);
  }

  onSelect(room: Room): void {
    this.selectedRoom = room;
  }

  ngOnInit(): void {
    this.getRooms();
  }

/*  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }*/
}

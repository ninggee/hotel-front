import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Room } from './room';
import { RoomService } from './room.service';

@Component({
  selector: 'room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: [ './room-detail.component.css' ]
})
export class RoomDetailComponent implements OnInit {
  room: Room;
  @Input() room_id: number;

  @Input() onFinish: any;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {

    this.room = new Room();
    this.room.room_number = 0;
    this.room.description = '';
    this.room.price = 0;
    this.room.room_type = '';

    if (this.room_id !== 0)  {
      this.route.paramMap
        .switchMap((params: ParamMap) => this.roomService.getRoom(this.room_id))
        .subscribe(room => {this.room = room;});
    }
  }

  save(): void {
    if (this.room_id !== 0) {
      this.roomService.update(this.room)
      .then(() => this.onFinish())
      .catch(() => this.onFinish());
    } else {
      this.roomService.create(this.room).then(() => this.onFinish());
    }

  }

  goBack(): void {
    this.location.back();
  }

}

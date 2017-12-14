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
    this.room.room_number = 1;
    this.room.description = '';
    this.room.price = 1;
    this.room.room_type = '';


    this.route.paramMap
      .switchMap((params: ParamMap) => this.roomService.getRoom(this.room_id))
      .subscribe(room => {this.room = room;});
  }

  save(): void {
    this.roomService.update(this.room)
      .then(() => this.onFinish())
      .catch(() => this.onFinish());
  }

  goBack(): void {
    this.location.back();
  }

}

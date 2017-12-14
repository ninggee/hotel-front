import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.roomService.getRoom(+params.get('id')))
      .subscribe(room => this.room = room);
  }

  save(): void {
    this.roomService.update(this.room)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

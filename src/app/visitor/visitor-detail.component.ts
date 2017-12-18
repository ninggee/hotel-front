import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Visitor } from './visitor';
import { VisitorService } from './visitor.service';
import { Room } from '../room/room';
import { RoomService } from '../room/room.service';
import { OrderService } from '../order/order.service';
import {Order} from '../order/order';

@Component({
  selector: 'visitor-detail',
  templateUrl: './visitor-detail.component.html',
  styleUrls: [ './visitor-detail.component.css' ]
})
export class VisitorDetailComponent implements OnInit {
  visitor: Visitor;
  room: Room;
  order: Order;
  visitor_edited: Visitor;
  visitor_query: Visitor;
  @Input() room_id: number;

  @Input() onFinish: any;

  constructor(
    private visitorService: VisitorService,
    private roomService: RoomService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {

    // room
    this.room = new Room();
    this.room.room_number = 0;
    this.room.description = '';
    this.room.price = 0;
    this.room.room_type = '';
    // visitor
    this.visitor = new Visitor();
    this.visitor.gender = '12';
    this.visitor.identity_card =  '3213123123123123';
    // order
    this.order = new Order();
    this.order.start_date = '2017-12-12 00:00:00';
    this.order.end_date = '2017-12-12 00:00:00';
    this.order.room_id = this.room.room_number;
    this.order.visitor_id = this.visitor.id;
    // 找到传过来的room
    if (this.room_id !== 0)  {
      this.route.paramMap
        .switchMap((params: ParamMap) => this.roomService.getRoom(this.room_id))
        .subscribe(room => {this.room = room; });
    }

  }

  save(): void {
    // 修改房间的order属性
    this.room.is_ordered = true;
    // if (this.room_id !== 0) {
      this.roomService.update(this.room)
        .then(() => {
          // this.onFinish();
          this.visitorService.getBidentity_card(this.visitor.identity_card).then((visitor) => {
            // 查询有没有这个visitor
            this.visitor_query = visitor;
            console.log(this.visitor_query);
            if (this.visitor_query.id > 0){// 已有访客
              // 添加order数据，不对visitor数据处理
              this.order.room_id = this.room.room_number;
              this.order.visitor_id = this.visitor_query.id;
              console.log(this.order.end_date);
              this.orderService.create(this.order).then(() => this.onFinish());
            }else {// 没有访客
              // 添加visitor数据
              this.visitorService.create(this.visitor).then((visitor) =>
              {
                this.visitor_edited = visitor;
                // 添加order数据
                this.order.room_id = this.room.room_number;
                this.order.visitor_id = this.visitor_edited.id;
                this.orderService.create(this.order).then(() => this.onFinish());
                // console.log(this.visitor_edited.id)
                /*  if (this.order.start_date.indexOf('T') > 0) {
                    this.order.start_date = this.order.start_date.replace('T', ' ');
                    date = new Date(this.order.start_date)
                  }
                  if (this.order.end_date.indexOf('T') > 0) {
                    this.order.end_date = this.order.end_date.replace('T', ' ');
                  }*/
                // this.orderService.create(this.order).then(() => this.onFinish());
              });
            }
          }) ;

        })
        .catch(() => this.onFinish());
/*    } else {
      this.roomService.create(this.room).then(() => this.onFinish());
    }*/
  }

  // goBack(): void {
  //   this.location.back();
  // }

}

import { Component, OnInit } from '@angular/core';
import {Room} from "../room/room";
import {Router} from "@angular/router";
import {RoomService} from "../room/room.service";
import {Order} from "../order/order";
import {OrderService} from "../order/order.service";
import {Visitor} from "../visitor/visitor";
import {VisitorService} from "../visitor/visitor.service";

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    public tableData1: TableData;
    public tableData2: TableData;
    public tableData3: TableData;
    rooms: Room[];
    selectedRoom: Room;

    orders: Order[];
    selsecedOrder: Order;

    visitors: Visitor[];
    selectVisitor: Visitor;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private orderService: OrderService,
    private  visitorService: VisitorService
  ) { }
  getRoomes(): void {
    this.roomService.getRooms().then(rooms => this.rooms = rooms);
  }
  getOrders(): void {
    this.orderService.getOrders().then(orders => this.orders = orders);
  }

  getVisitors(): void {
    this.visitorService.getVisitors().then(visitors => this.visitors = visitors);
  }
    ngOnInit(){
      this.getRoomes();
      this.getOrders();
      this.getVisitors();
        this.tableData1 = {
            headerRow: [ 'ID', 'Room Number', 'Room Type', 'Price', 'Description','IsOrdered'],
            dataRows: [
                ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738','yes'],
                ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789','no'],
                ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
                ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
                ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
                ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
            ]
        };
        this.tableData2 = {
            headerRow: [ 'ID', 'room_id',  'visitor id', 'start date', 'end date' ],
            dataRows: [
                ['1', 'Dakota Rice','$36,738', 'Niger', 'Oud-Turnhout' ],
                ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
                ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
                ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
                ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
                ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
            ]
        };
      this.tableData3 = {
        headerRow: [ 'ID', 'gender',  'identity card'],
        dataRows: [
          ['1', 'Dakota Rice','$36,738', 'Niger', 'Oud-Turnhout' ],
          ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
          ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
          ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
          ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
          ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
        ]
      };
    }
}

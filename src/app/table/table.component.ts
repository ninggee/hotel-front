import { Component, OnInit, OnChanges } from '@angular/core';
import {Room} from "../room/room";
import {Router} from "@angular/router";
import {RoomService} from "../room/room.service";
import {Order} from "../order/order";
import {OrderService} from "../order/order.service";
import {Visitor} from "../visitor/visitor";
import {VisitorService} from "../visitor/visitor.service";
import { showDialog } from '../utils/Helpers';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

declare var $: any;

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit, OnChanges{
    public tableData1: TableData;
    public tableData2: TableData;
    public tableData3: TableData;
    rooms: Room[];
    selectedRoom: Room;
    room: Room;

    orders: Order[];
    selsecedOrder: Order;

    visitors: Visitor[];
    selectVisitor: Visitor;

    room_id: number;
    edit_room = false;
    onEditRoomFinished: Function;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private orderService: OrderService,
    private  visitorService: VisitorService
  ) {
    this.onEditRoomFinished = this.onEditRoomFinish.bind(this);
  }
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
            headerRow: ['房间号', '房间类型', '价格', '介绍', '已预订', '操作'],
            dataRows: [
            ]
        };
    $.extend( $.fn.dataTable.defaults, {
        searching: false,
        ordering:  false
    } );
    this.renderTables();
  }

  ngOnChanges() {


  }

  editRoomFunc(id: number) {
    this.edit_room = true;
    this.room_id = id;
  }

  onEditRoomFinish() {
    let message = '';
    if (this.room_id === 0) {
      message = '添加成功';
    } else {
      message = '修改成功';    }
    this.room_id = 0;
    this.edit_room = false;
    showDialog('top', 'center', 'success', message, 1000);
    this.ngOnInit();
    // this.renderTables();
  }
   // delete a room
  deleteRoom(id: number) {
    this.roomService.delete(id).then(() => {
      showDialog('top', 'center', 'success', '删除成功', 1000);
      this.ngOnInit();
    });
  }


  renderTables() {
    $(document).ready(() => {
      $('#table_id').DataTable();
      $('#order_table').DataTable();
    });
  }
}

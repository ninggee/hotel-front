import { Component, OnInit, OnChanges } from '@angular/core';
import {Room} from "../room/room";
import {Router} from "@angular/router";
import {RoomService} from "../room/room.service";
import { showDialog } from '../utils/Helpers';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

declare var $: any;

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {
  public tableData1: TableData;
  rooms: Room[];
  selectedRoom: Room;
  room: Room;
  room_id: number;
  isEdit = false;
  onEditRoomFinished: Function;

constructor(
  private roomService: RoomService,
  private router: Router,
) {
  this.onEditRoomFinished = this.onEditRoomFinish.bind(this);
}
getRoomes(): void {
  this.roomService.getRooms().then(rooms => this.rooms = rooms);
}

  ngOnInit(){
    this.getRoomes();
      this.tableData1 = {
          headerRow: ['房间号', '房间类型', '价格', '介绍', '操作'],
          dataRows: [
          ]
      };
  $.extend( $.fn.dataTable.defaults, {
      searching: false,
      ordering:  false
  } );
  this.renderTables();
}

order(id: number) {
  this.isEdit = true;
  this.room_id = id;
}

onEditRoomFinish() {
  let message = '';
  if (this.room_id === 0) {
    message = '添加成功';
  } else {
    message = '修改成功';    }
  this.room_id = 0;
  this.isEdit = false;
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

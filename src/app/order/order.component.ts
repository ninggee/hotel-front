import {Component, OnInit} from '@angular/core';
import {Order} from './order';
import { OrderService } from './order.service';
import {Router} from '@angular/router';
import { TableComponent } from '../table/table.component';
import { showDialog } from 'app/utils/Helpers';

declare var $: any;

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}


@Component({
  selector: 'app-heroes',
  templateUrl: './order.component.html',
  styleUrls: [ './order.component.css' ]
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  selectedOrder: Order;
  tableData2: TableData;
  isEdit = false;
  order_edited: Order;
  order_id: number;
  constructor(
    private orderService: OrderService,
    private router: Router
  ) {
    this.tableData2 = {
    headerRow: [ '编号', '房间编号',  '订房者编号', '开始时间', '结束时间', '操作' ],
    dataRows: [
    ]
}; }

  getOrders(): void {
    this.orderService.getOrders().then(orders => {
        this.orders = orders;
        this.renderTable();
    });
  }

  onSelect(order: Order): void {
    this.selectedOrder = order;
  }

  ngOnInit(): void {
    this.getOrders();
    $.extend( $.fn.dataTable.defaults, {
      searching: false,
      ordering:  false
    });
  }

  renderTable() {
    $(document).ready(
      () => {
        $('#order_table').DataTable();
      }
    );
  }

  editFunc(id: number): void {
    this.isEdit = true;
    this.order_edited = new Order();
    this.orderService.getRoom(id).then(
      (order) => {
        this.order_edited = order;
      }
    );

    this.order_id = id;
  }

  save() {
    this.orderService.update(this.order_edited).then(
      () => this.onFinished()
    );
  }

  onFinished() {
    this.isEdit = false;
    this.order_id = 0;
    this.order_edited = null;
    showDialog('top', 'center', 'success', '修改成功', 1000);
    this.ngOnInit();
  }

  delete(id: number): void {
    this.orderService.delete(id).then(
      () => {
        showDialog('top', 'center', 'success', '删除成功', 1000);
        this.ngOnInit();
      }
    );
  }
}

import {Component, OnInit} from '@angular/core';
import {Visitor} from './visitor';
import {VisitorService} from './visitor.service';
import {Router} from '@angular/router';
import { showDialog } from 'app/utils/Helpers';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

declare var $: any;

@Component({
  selector: 'app-heroes',
  templateUrl: './visitor.component.html',
  styleUrls: [ './visitor.component.css' ]
})
export class VisitorsComponent implements OnInit {
  visitors: Visitor[];
  tableData: TableData;

  constructor(
    private visitorService: VisitorService,
    private router: Router
  ) { }

  getVisitors(): void {
    this.visitorService.getVisitors().then(visitors => {this.visitors = visitors; this.renderTable();});
  }

  ngOnInit(): void {
    this.getVisitors();

    $.extend( $.fn.dataTable.defaults, {
      searching: false,
      ordering:  false
    });

    this.tableData = {
      headerRow: [ '编号', '年龄',  '身份证号', '操作'],
      dataRows: [
      ]
    };
  }
  delete(id: number): void {
    this.visitorService.delete(id).then((res) => {
      if (res.status) {
        showDialog('top', 'center', 'success',  res.message, 1000);
        this.ngOnInit();
      } else {
        showDialog('top', 'center', 'danger', res.message, 1000);
      }
    });
  }

  renderTable() {
    $(document).ready(() => {
      $('#visitor_table').DataTable();
    });
  }
}

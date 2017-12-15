import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [UserService],
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public tableData: TableData;
  public users: User[];
  public isEdit = false;
  constructor(private userservice: UserService) { }

  ngOnInit() {
    this.tableData = {
      headerRow: ['用户编号', '用户姓名', '管理员', '添加日期','操作'],
      dataRows: [
      ]
    };
    $.extend( $.fn.dataTable.defaults, {
      searching: false,
      ordering:  false
    });
    this.getUsers();
  }

  getUsers() {
    this.userservice.getUsers().then(
      (users) => {
        this.users = users;
        this.renderTable();
      }
    );
  }

  editUser(id: number) {

  }

  deleteUser(id: number) {

  }

  renderTable() {
    $(document).ready(() => {
      $('#user_table').DataTable();
    });
  }

}

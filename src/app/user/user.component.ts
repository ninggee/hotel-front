import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { Auth } from '../utils/Auth';
import { showDialog } from 'app/utils/Helpers';
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

  public user_id  = 0;
  public user: User;

  public isAdmin = Auth.get('isAdmin');

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

    this.user = new User();
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
    this.user = new User();
    if (id !== 0) {
      this.userservice.getUser(id).then(user => {
        this.user = user;
      });
    }

    this.isEdit = true;
    this.user_id = id;
  }

  deleteUser(id: number) {
    this.userservice.delete(id).then(res => {
      if (res.status) {
        showDialog('top', 'center', 'success', res.message, 1000);
        this.ngOnInit();
      } else {
        showDialog('top', 'center', 'danger', res.message, 1000);
      }
    });
   }

  renderTable() {
    $(document).ready(() => {
      $('#user_table').DataTable();
    });
  }

  save() {
    if (this.user_id === 0) {
      const func = this.user.is_admin === true ? this.userservice.addAdmin.bind(this.userservice) :
        this.userservice.addNormal.bind(this.userservice);
      func(this.user).then(
          res => {
            if (res.status) {
              this.finish();
              showDialog('top', 'center', 'success', '添加成功', 1000);
            } else {
              showDialog('top', 'center', 'danger', res.message, 1000);
            }
          }
      );
    } else {
      this.userservice.update(this.user).then(
        res => {
          if (res.status) {
            this.finish();
            showDialog('top', 'center', 'success', '更新成功', 1000);
          } else {
            showDialog('top', 'center', 'danger', res.message, 1000);
          }
        }
      );
    }
  }

  finish() {
    this.isEdit = false;
    this.user = new User();
    this.user_id = 0;
    this.ngOnInit();
  }

}

import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { URLSearchParams } from '@angular/http/src/url_search_params';
import { RequestOptions } from '@angular/http/src/base_request_options';
import { Auth } from '../utils/Auth';
import { Router } from '@angular/router';

declare var $: any;
const SERVER_URL = 'http://121.193.130.195:4567';

@Component({
  selector: 'login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  errorMessage: string;

  constructor(fb: FormBuilder, private http: HttpClient, private router: Router) {
   this.loginForm = fb.group({
     'username': ['', Validators.required],
     'password': ['', Validators.required]
   });

   this.errorMessage = '';
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup): void {
    this.errorMessage = '';
    let username = form.value.username;
    let password = form.value.password;

    if(username !== '' && password !== '') {

      this.http.post(
        SERVER_URL + '/user/login',
        JSON.stringify({
          username: username,
          password: password
        }))
        .subscribe((res: Response) => {
           let status = res['status']
           if(status) {
             this.showNotification('top', 'center');
             // read user info from infomation from server
             let userInfo = res['result']
             // set Auth info
             Auth.setAuth(userInfo.uid, userInfo.username, userInfo.isAdmin);

             console.log(Auth.getAuth());

             setTimeout(() => window.location.reload(), 1000);
           } else {
             this.errorMessage = res['message'];
           }
        })
    } else {
      this.errorMessage = '输入不完整';
    }
  }


  showNotification(from, align){
    let type = ['','info','success','warning','danger'];

    let color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "ti-gift",
        message: "登录成功"
      },{
          type: 'success',
          timer: 4000,
          placement: {
              from: from,
              align: align
          }
      });
  }

}

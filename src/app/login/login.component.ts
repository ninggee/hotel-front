import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { URLSearchParams } from '@angular/http/src/url_search_params';
import { RequestOptions } from '@angular/http/src/base_request_options';

declare var $: any;

@Component({
  selector: 'login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  errorMessage: string;

  constructor(fb: FormBuilder, private http: HttpClient) {
   this.loginForm = fb.group({
     'username': ['', Validators.required],
     'password': ['', Validators.required]
   });

   console.log(this.http)

   this.errorMessage = "";
  }

  ngOnInit() {
  }

  onSubmit(form: FormGroup): void {
    this.errorMessage = '';
    let username = form.value.username;
    let password = form.value.password;

    if(username !== '' && password !== '') {

      this.http.post(
        'http://localhost:4567/user/login',
        JSON.stringify({
          username: username,
          password: password
        }))
        .subscribe((res: Response) => {
           let status = res['status']
           if(status) {
             this.showNotification('top', 'center');

           } else {
             this.errorMessage = res['message'];
           }
        })
    } else {
      this.errorMessage = '输入不完整';
    }


  }


  showNotification(from, align){
    var type = ['','info','success','warning','danger'];

    var color = Math.floor((Math.random() * 4) + 1);

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

import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Auth } from './utils/Auth';
import {RoomService} from './room/room.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isLogin: boolean; // store user login info

  ngOnInit() {
    let auth = Auth.getAuth();
    this.isLogin = auth.isLogin;
  }

}

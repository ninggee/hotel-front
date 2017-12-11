import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Auth } from './utils/Auth';
import {HeroService} from './hero.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isLogin: boolean = Auth.isLogin;

}

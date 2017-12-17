import {Auth} from '../utils/Auth';
import { Component, OnInit } from '@angular/core';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: '欢迎页',  icon: 'ti-panel', class: '' },
    { path: 'visitor', title: '房客管理',  icon:'ti-user', class: '' },
    { path: 'room', title: '客房管理',  icon:'ti-bag', class: '' },
    { path: 'order', title: '订单管理',  icon:'ti-view-list-alt', class: '' },
    { path: 'user', title: '用户管理',  icon:'ti-lock', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public username = Auth.get('username');
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        // this.username = Auth.get('name');
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

}

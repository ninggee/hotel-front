import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.route';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FixedPluginComponent } from './shared/fixedplugin/fixedplugin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { Auth } from './utils/Auth';
import { TableComponent } from './table/table.component';
import { IconsComponent } from './icons/icons.component';
import { RoomService } from './room/room.service';
import {RoomsComponent} from './room/room.component';
import {OrderService } from './order/order.service';
import {OrdersComponent} from './order/order.component';
import {VisitorService } from './visitor/visitor.service';
import {VisitorsComponent} from './visitor/visitor.component';
import {RoomDetailComponent} from './room/room-detail.component';
import { UserComponent } from './user/user.component';
import { FrontendComponent } from './frontend/frontend.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    FixedPluginComponent,
    SidebarComponent,
    FixedPluginComponent,
    LoginComponent,
    TableComponent,
    RoomsComponent,
    OrdersComponent,
    VisitorsComponent,
    RoomDetailComponent,
    UserComponent,
    FrontendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule
  ],
  providers: [RoomService,
    OrderService,
    VisitorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

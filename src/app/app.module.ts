import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.route';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FixedPluginComponent } from './shared/fixedplugin/fixedplugin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { Auth } from './utils/Auth'
import { TableComponent }   from './table/table.component';
import { IconsComponent }   from './icons/icons.component';
import { HeroService }          from './hero.service';
import {HeroesComponent} from './hero.component';

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
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TableComponent }   from './table/table.component';
import { HeroesComponent }      from './hero.component';
import { IconsComponent }   from './icons/icons.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
      path: 'icons',
      component: HeroesComponent
    }
]

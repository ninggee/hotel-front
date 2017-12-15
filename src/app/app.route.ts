import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';
import { RoomsComponent } from './room/room.component';
import { IconsComponent } from './icons/icons.component';
import { RoomDetailComponent } from './room/room-detail.component';
import { OrdersComponent } from './order/order.component';
import { VisitorsComponent } from 'app/visitor/visitor.component';
import { UserComponent } from './user/user.component';

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
      path: 'room',
      component: TableComponent
    },
    {
      path: 'order',
      component: OrdersComponent
    },
    {
      path: 'visitor',
      component: VisitorsComponent
    },
    {
      path: 'user',
      component: UserComponent
    }

]

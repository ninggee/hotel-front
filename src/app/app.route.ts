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
        path: 'admin/dashboard',
        component: DashboardComponent
    },
    {
        path: 'admin/login',
        component: LoginComponent
    },
    {
        path: 'admin/table',
        component: TableComponent
    },
    {
      path: 'admin/room',
      component: TableComponent
    },
    {
      path: 'admin/order',
      component: OrdersComponent
    },
    {
      path: 'admin/visitor',
      component: VisitorsComponent
    },
    {
      path: 'admin/user',
      component: UserComponent
    }

]

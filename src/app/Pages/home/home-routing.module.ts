import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminDashboardComponent } from './super-admin/dashboard/super-admin-dashboard/super-admin-dashboard.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { AuthGuard } from 'src/app/Shared/auth.guard';
import { AdminListComponent } from './super-admin/admin-list/admin-list.component';
import { SalonListComponent } from './super-admin/salon-list/salon-list.component';
import { CategoryListComponent } from './super-admin/category-list/category-list.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate:  [AuthGuard],
    children: [
     { path: 'super-Admin-Dashboard', component: SuperAdminDashboardComponent},
     { path: 'admin-list', component: AdminListComponent},
     { path: 'salon-list', component: SalonListComponent},
     { path: 'Category-list', component: CategoryListComponent}

    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

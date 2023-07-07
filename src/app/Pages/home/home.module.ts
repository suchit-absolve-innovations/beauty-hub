import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SuperAdminDashboardComponent } from './super-admin/dashboard/super-admin-dashboard/super-admin-dashboard.component';
import { AdminListComponent } from './super-admin/admin-list/admin-list.component';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [  
   SuperAdminDashboardComponent,
   AdminListComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }

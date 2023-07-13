import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SuperAdminDashboardComponent } from './super-admin/dashboard/super-admin-dashboard/super-admin-dashboard.component';
import { AdminListComponent } from './super-admin/admin-list/admin-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SalonListComponent } from './super-admin/salon-list/salon-list.component';
import { CategoryListComponent } from './super-admin/category-list/category-list.component';





@NgModule({
  declarations: [  
   SuperAdminDashboardComponent,
   AdminListComponent,
   SalonListComponent,
   CategoryListComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }

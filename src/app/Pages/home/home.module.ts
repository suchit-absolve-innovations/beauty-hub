import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuperAdminDashboardComponent } from './SuperAdmin/SuperDashboard/super-admin-dashboard/super-admin-dashboard.component';
import { AdminListComponent } from './SuperAdmin/Admin/admin-list/admin-list.component';
import { CategoryListComponent } from './SuperAdmin/Category/category-list/category-list.component';

import { AddEditAdminComponent } from './SuperAdmin/Admin/add-edit-admin/add-edit-admin.component';
import { AddEditCategoryComponent } from './SuperAdmin/Category/add-edit-category/add-edit-category.component';
import { AddEditBannerComponent } from './SuperAdmin/Banners/add-edit-banner/add-edit-banner.component';
import { BannerListComponent } from './SuperAdmin/Banners/banner-list/banner-list.component';
import { BannerDetailComponent } from './SuperAdmin/Banners/banner-detail/banner-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MembershipListComponent } from './SuperAdmin/Membership/membership-list/membership-list.component';
import { MembershipAddEditComponent } from './SuperAdmin/Membership/membership-add-edit/membership-add-edit.component';
import { SuperAdminProfileComponent } from './SuperAdmin/Profile/super-admin-profile/super-admin-profile.component';

import { BuyMebershipPlanListComponent } from './SuperAdmin/Salon/buy-mebership-plan-list/buy-mebership-plan-list.component';
import { SalonDetailComponent } from './SuperAdmin/Salon/salon-detail/salon-detail.component';
import { AgmCoreModule } from '@agm/core';
import { SalonListComponent } from './SuperAdmin/Salon/salon-list/salon-list.component';
import { AddSalonsComponent } from './SuperAdmin/Salon/add-salons/add-salons.component';









@NgModule({
  declarations: [  
   SuperAdminDashboardComponent,
   AdminListComponent,
   SalonListComponent,
   CategoryListComponent,
   AddSalonsComponent,
   AddEditAdminComponent,
   AddEditCategoryComponent,
   AddEditBannerComponent,
   BannerListComponent,
   BannerDetailComponent,
   MembershipListComponent,
   MembershipAddEditComponent,
   SuperAdminProfileComponent,
   BuyMebershipPlanListComponent,
   SalonDetailComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqVkAIpWw38LEG9LghW1s0ZzSW-PUsjt0',
      libraries: ['places']
    })

 
  ]
})
export class HomeModule { }

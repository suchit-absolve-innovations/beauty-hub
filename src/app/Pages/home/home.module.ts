import { NgModule } from '@angular/core';

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
import { QRCodeModule } from 'angularx-qrcode';
import { AgmCoreModule } from '@agm/core';
import { SalonListComponent } from './SuperAdmin/Salon/salon-list/salon-list.component';
import { AddSalonsComponent } from './SuperAdmin/Salon/add-salons/add-salons.component';
import { CommonModule } from '@angular/common';
import { SubCategoryListComponent } from './SuperAdmin/Category/sub-category-list/sub-category-list.component';
import { AddEditSubCategoryComponent } from './SuperAdmin/Category/sub-category-list/add-edit-sub-category/add-edit-sub-category.component';
import { SubSubCategoryListComponent } from './SuperAdmin/Category/sub-sub-category-list/sub-sub-category-list.component';
import { AddEditSubSubCategoryComponent } from './SuperAdmin/Category/sub-sub-category-list/add-edit-sub-sub-category/add-edit-sub-sub-category.component';
import { VendorProfileComponent } from './Vendor/vendor-profile/vendor-profile.component';
import { ShopBannerListComponent } from './Vendor/shop-banner-list/shop-banner-list.component';










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
   SubCategoryListComponent,
   AddEditSubCategoryComponent,
   SubSubCategoryListComponent,
   AddEditSubSubCategoryComponent,
   VendorProfileComponent,
   ShopBannerListComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    QRCodeModule,    
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqVkAIpWw38LEG9LghW1s0ZzSW-PUsjt0',
      libraries: ['places']
    })

 
  ]
})
export class HomeModule { }

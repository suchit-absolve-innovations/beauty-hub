import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuperAdminDashboardComponent } from './SuperAdmin/SuperDashboard/super-admin-dashboard/super-admin-dashboard.component';
import { AdminListComponent } from './SuperAdmin/Admin/admin-list/admin-list.component';
import { CategoryListComponent } from './SuperAdmin/Category/category-list/category-list.component';
import { SalonListComponent } from './SuperAdmin/Saolon/salon-list/salon-list.component';
import { AddSalonsComponent } from './SuperAdmin/Saolon/add-salons/add-salons.component';
import { AddEditAdminComponent } from './SuperAdmin/Admin/add-edit-admin/add-edit-admin.component';
import { AddEditCategoryComponent } from './SuperAdmin/Category/add-edit-category/add-edit-category.component';
import { AddEditBannerComponent } from './SuperAdmin/Banners/add-edit-banner/add-edit-banner.component';
import { BannerListComponent } from './SuperAdmin/Banners/banner-list/banner-list.component';
import { BannerDetailComponent } from './SuperAdmin/Banners/banner-detail/banner-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';









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

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class HomeModule { }

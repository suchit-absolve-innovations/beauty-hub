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
import { VendorProfileComponent } from './Vendor/vendor-profile/vendor-profile.component';
import { ShopBannerListComponent } from './Vendor/Salon Banners/shop-banner-list/shop-banner-list.component';
import { SalonBannerDetailComponent } from './Vendor/Salon Banners/salon-banner-detail/salon-banner-detail.component';
import { AddEditSalonBannerComponent } from './Vendor/Salon Banners/add-edit-salon-banner/add-edit-salon-banner.component';
import { EditSalonBannerComponent } from './Vendor/Salon Banners/edit-salon-banner/edit-salon-banner.component';
import { AdminDetailComponent } from './SuperAdmin/Admin/admin-detail/admin-detail.component';
import { ServiceListComponent } from './SuperAdmin/Service/service-list/service-list.component';
import { AdminProfileComponent } from './Admin/admin-profile/admin-profile.component';
import { AddServiceComponent } from './SuperAdmin/Service/add-service/add-service.component';
import { ServiceDetailComponent } from './SuperAdmin/Service/service-detail/service-detail.component';
import { AddEditScheduleComponent } from './Vendor/Scheduled/add-edit-schedule/add-edit-schedule.component';
import { EditServiceComponent } from './SuperAdmin/Service/edit-service/edit-service.component';
import { NumberDirective } from 'src/app/number.directive';
import { SuperNotificationListComponent } from './SuperAdmin/Notifications/super-notification-list/super-notification-list.component';
import { SuperAddNotificationComponent } from './SuperAdmin/Notifications/super-add-notification/super-add-notification.component';
import { VendorNotificationListComponent } from './Vendor/Notifications/vendor-notification-list/vendor-notification-list.component';
import { VendorAddNotificationComponent } from './Vendor/Notifications/vendor-add-notification/vendor-add-notification.component';
import { AppointmentListComponent } from './Vendor/Appointments/appointment-list/appointment-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppointmentDetailComponent } from './Vendor/Appointments/appointment-detail/appointment-detail.component';
import { BookedServiceListComponent } from './Vendor/Appointments/booked-service-list/booked-service-list.component';
import { PackageListComponent } from './Vendor/Packages/package-list/package-list.component';
import { PackageDetailComponent } from './Vendor/Packages/package-detail/package-detail.component';
import { AddEditPackageComponent } from './Vendor/Packages/add-edit-package/add-edit-package.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditPackageComponent } from './Vendor/Packages/edit-package/edit-package.component';










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

   VendorProfileComponent,
   ShopBannerListComponent,
   SalonBannerDetailComponent,
   AddEditSalonBannerComponent,
   EditSalonBannerComponent,
   AdminDetailComponent,
   ServiceListComponent,
   AdminProfileComponent,
   AddServiceComponent,
   ServiceDetailComponent,
   AddEditScheduleComponent,
   EditServiceComponent,
   NumberDirective,
   SuperNotificationListComponent,
   SuperAddNotificationComponent,
   VendorNotificationListComponent,
   VendorAddNotificationComponent,
   AppointmentListComponent,
   AppointmentDetailComponent,
   BookedServiceListComponent,
   PackageListComponent,
   PackageDetailComponent,
   AddEditPackageComponent,
   EditPackageComponent,
  



  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    QRCodeModule,    
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBStBK-iNO1S6himB2q41PLm9bSoBfVmP4',
      libraries: ['places']
    })

 
  ]
})
export class HomeModule { }

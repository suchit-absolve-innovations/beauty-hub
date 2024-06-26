import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Shared/auth.guard';
import { LayoutComponent } from 'src/app/layout/layout.component';

import { BannerDetailComponent } from './SuperAdmin/Banners/banner-detail/banner-detail.component';
import { SuperAdminDashboardComponent } from './SuperAdmin/SuperDashboard/super-admin-dashboard/super-admin-dashboard.component';
import { AdminListComponent } from './SuperAdmin/Admin/admin-list/admin-list.component';
import { AddEditAdminComponent } from './SuperAdmin/Admin/add-edit-admin/add-edit-admin.component';

import { AddEditCategoryComponent } from './SuperAdmin/Category/add-edit-category/add-edit-category.component';
import { BannerListComponent } from './SuperAdmin/Banners/banner-list/banner-list.component';
import { AddEditBannerComponent } from './SuperAdmin/Banners/add-edit-banner/add-edit-banner.component';
import { MembershipAddEditComponent } from './SuperAdmin/Membership/membership-add-edit/membership-add-edit.component';
import { MembershipListComponent } from './SuperAdmin/Membership/membership-list/membership-list.component';
import { SuperAdminProfileComponent } from './SuperAdmin/Profile/super-admin-profile/super-admin-profile.component';
import { SalonListComponent } from './SuperAdmin/Salon/salon-list/salon-list.component';
import { AddSalonsComponent } from './SuperAdmin/Salon/add-salons/add-salons.component';
import { SalonDetailComponent } from './SuperAdmin/Salon/salon-detail/salon-detail.component';
import { BuyMebershipPlanListComponent } from './SuperAdmin/Salon/buy-mebership-plan-list/buy-mebership-plan-list.component';
import { SubCategoryListComponent } from './SuperAdmin/Category/sub-category-list/sub-category-list.component';
import { AddEditSubCategoryComponent } from './SuperAdmin/Category/sub-category-list/add-edit-sub-category/add-edit-sub-category.component';
import { CategoryListComponent } from './SuperAdmin/Category/category-list/category-list.component';
import { VendorProfileComponent } from './Vendor/vendor-profile/vendor-profile.component';
import { ShopBannerListComponent } from './Vendor/Salon Banners/shop-banner-list/shop-banner-list.component';
import { SalonBannerDetailComponent } from './Vendor/Salon Banners/salon-banner-detail/salon-banner-detail.component';
import { AddEditSalonBannerComponent } from './Vendor/Salon Banners/add-edit-salon-banner/add-edit-salon-banner.component';
import { EditSalonBannerComponent } from './Vendor/Salon Banners/edit-salon-banner/edit-salon-banner.component';
import { AdminDetailComponent } from './SuperAdmin/Admin/admin-detail/admin-detail.component';
import { ServiceListComponent } from './SuperAdmin/Service/service-list/service-list.component';
import { AddServiceComponent } from './SuperAdmin/Service/add-service/add-service.component';
import { AdminProfileComponent } from './Admin/admin-profile/admin-profile.component';
import { ServiceDetailComponent } from './SuperAdmin/Service/service-detail/service-detail.component';
import { AddEditScheduleComponent } from './Vendor/Scheduled/add-edit-schedule/add-edit-schedule.component';
import { EditServiceComponent } from './SuperAdmin/Service/edit-service/edit-service.component';
import { SuperNotificationListComponent } from './SuperAdmin/Notifications/super-notification-list/super-notification-list.component';
import { SuperAddNotificationComponent } from './SuperAdmin/Notifications/super-add-notification/super-add-notification.component';
import { VendorNotificationListComponent } from './Vendor/Notifications/vendor-notification-list/vendor-notification-list.component';
import { VendorAddNotificationComponent } from './Vendor/Notifications/vendor-add-notification/vendor-add-notification.component';
import { AppointmentListComponent } from './Vendor/Appointments/appointment-list/appointment-list.component';
import { AppointmentDetailComponent } from './Vendor/Appointments/appointment-detail/appointment-detail.component';
import { PackageListComponent } from './Vendor/Packages/package-list/package-list.component';
import { PackageDetailComponent } from './Vendor/Packages/package-detail/package-detail.component';
import { AddEditPackageComponent } from './Vendor/Packages/add-edit-package/add-edit-package.component';
import { EditPackageComponent } from './Vendor/Packages/edit-package/edit-package.component';
import { EditCategoryComponent } from './SuperAdmin/Category/edit-category/edit-category.component';
import { EditSubCategoryComponent } from './SuperAdmin/Category/sub-category-list/edit-sub-category/edit-sub-category.component';
import { UpComingScheduleDetailComponent } from './Vendor/Scheduled/up-coming-schedule-detail/up-coming-schedule-detail.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'super-Admin-Dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'super-Admin-Dashboard', component: SuperAdminDashboardComponent },
      { path: 'salon-list', component: SalonListComponent },
      { path: 'salon-list/buy-membership-plan/add-salon', component: AddSalonsComponent },
      { path: 'salon-list/salon-detail/:id/:id2', component: SalonDetailComponent },
      { path: 'admin-list', component: AdminListComponent },
      { path: 'admin-list/add-edit-admin', component: AddEditAdminComponent },
      { path: 'admin-list/admin-detail/:id', component: AdminDetailComponent },
      { path: 'category-list', component: CategoryListComponent },
      { path: 'category-list/add-edit-category', component: AddEditCategoryComponent },
      { path: 'category-list/sub-category-list/:id', component: SubCategoryListComponent },
      { path: 'category-list/sub-category-list', component: SubCategoryListComponent },
      { path: 'category-list/sub-category-list/addEdit-sub-category', component: AddEditSubCategoryComponent },
      { path: 'category-list/sub-category-list/addEdit-sub-category/:id', component: AddEditSubCategoryComponent },
      { path: 'category-list/sub-category-list/addEdit-sub-category/:id/:id2', component: AddEditSubCategoryComponent },
      { path: 'banner-list', component: BannerListComponent },
      { path: 'banner-list/add-edit-banner', component: AddEditBannerComponent },
      { path: 'banner-list/banner-detail/:id', component: BannerDetailComponent },
      { path: 'plan-list', component: MembershipListComponent },
      { path: 'plan-list/add-edit-plan', component: MembershipAddEditComponent },
      { path: 'super-admin-profile', component: SuperAdminProfileComponent },
      { path: 'salon-list/buy-membership-plan', component: BuyMebershipPlanListComponent },
      { path: 'salon-list/service-list', component : ServiceListComponent},
      { path: 'salon-list/service-list/add-service', component : AddServiceComponent},
      { path: 'salon-list/service-list/service-detail',component : ServiceDetailComponent},
      { path: 'add-edit-schedule',component : AddEditScheduleComponent},
      { path: 'salon-list/service-list/edit-service', component: EditServiceComponent},
      { path: 'super-notification-list',component: SuperNotificationListComponent},   
      { path: 'super-notification-list/add-notification', component:SuperAddNotificationComponent},
      { path: 'vendor-notification-list', component:VendorNotificationListComponent},
      { path: 'vendor-notification-list/add-notification', component:VendorAddNotificationComponent},
      { path: 'category-list/category-edit',component:EditCategoryComponent},
      { path: 'category-list/sub-category-list/sub-category-edit/:id/:id2',component:EditSubCategoryComponent},
      { path: 'category-list/sub-category-edit/:id/:id2',component:EditSubCategoryComponent},

      //////Admin///////
      { path: 'admin-user-profile', component: AdminProfileComponent },

    


     //vendor//
     { path: 'appointment-list', component: AppointmentListComponent },
     { path: 'appointment-list/appointment-detail/:id', component: AppointmentDetailComponent },
     { path: 'salon-banner-list', component: ShopBannerListComponent },
     { path: 'salon-banner-list/Salon-detail/:id', component: SalonBannerDetailComponent },
     { path: 'salon-banner-list/add-salon-banner', component: AddEditSalonBannerComponent },
     { path: 'salon-banner-list/edit-salon-banner/:id/:id2', component: EditSalonBannerComponent },
     { path: 'vendor-service-list', component: ServiceListComponent },
     { path: 'vendor-service-list/add-service', component: AddServiceComponent },
     { path: 'vendor-service-list/service-detail', component: ServiceDetailComponent },
     { path: 'vendor-service-list/edit-service', component: EditServiceComponent },
     { path: 'vendor-profile', component: VendorProfileComponent },
     { path: 'subscription', component: BuyMebershipPlanListComponent },
     { path: 'subscription/buy-membership-plan/add-salon', component: AddSalonsComponent },
     { path: 'add-edit-schedule', component: AddEditScheduleComponent },
     { path: 'add-edit-schedule/up-coming-schedule-detail/:date', component: UpComingScheduleDetailComponent },
     { path: 'vendor-notification-list', component: VendorNotificationListComponent },
     { path: 'vendor-notification-list/add-notification', component: VendorAddNotificationComponent },
     { path: 'package-list', component: PackageListComponent},
     { path: 'package-list/package-detail/:id/:type', component: PackageDetailComponent},
     { path: 'package-list/add-edit-package',component: AddEditPackageComponent},
     { path: 'package-list/edit-package', component: EditPackageComponent}
    
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

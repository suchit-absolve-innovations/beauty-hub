import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Shared/auth.guard';
import { LayoutComponent } from 'src/app/layout/layout.component';

import { BannerDetailComponent } from './SuperAdmin/Banners/banner-detail/banner-detail.component';
import { SuperAdminDashboardComponent } from './SuperAdmin/SuperDashboard/super-admin-dashboard/super-admin-dashboard.component';
import { AdminListComponent } from './SuperAdmin/Admin/admin-list/admin-list.component';
import { AddEditAdminComponent } from './SuperAdmin/Admin/add-edit-admin/add-edit-admin.component';
import { CategoryListComponent } from './SuperAdmin/Category/category-list/category-list.component';
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
import { AddEditSubSubCategoryComponent } from './SuperAdmin/Category/sub-sub-category-list/add-edit-sub-sub-category/add-edit-sub-sub-category.component';
import { SubSubCategoryListComponent } from './SuperAdmin/Category/sub-sub-category-list/sub-sub-category-list.component';



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
     { path: 'salon-list', component: SalonListComponent},    
     { path: 'salon-list/buy-membership-plan/add-salon', component: AddSalonsComponent},
     { path: 'salon-list/salon-detail/:id/:id2',component:SalonDetailComponent},
     { path: 'admin-list', component: AdminListComponent},
     { path: 'admin-list/add-edit-admin',component: AddEditAdminComponent},
     { path: 'category-list', component: CategoryListComponent},
     { path: 'category-list/add-edit-category', component: AddEditCategoryComponent},
     { path: 'category-list/sub-category-list',component:SubCategoryListComponent},
     { path: 'category-list/sub-category-list/addEdit-sub-category',component:AddEditSubCategoryComponent},
     { path: 'category-list/sub-category-list/subSub-category-list',component:SubSubCategoryListComponent},
     { path: 'category-list/sub-category-list/subSub-category-list/AddEdit-subSub-Category',component:AddEditSubSubCategoryComponent},
     { path: 'banner-list', component: BannerListComponent},
     { path: 'banner-list/add-edit-banner', component: AddEditBannerComponent},
     { path: 'banner-list/banner-detail/:id', component: BannerDetailComponent},
     { path: 'plan-list',component: MembershipListComponent},
     { path: 'plan-list/add-edit-plan',component: MembershipAddEditComponent},
     { path: 'super-admin-profile',component: SuperAdminProfileComponent},
     { path: 'salon-list/buy-membership-plan',component: BuyMebershipPlanListComponent},
    
     

    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

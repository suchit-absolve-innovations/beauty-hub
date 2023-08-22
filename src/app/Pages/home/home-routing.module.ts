import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Shared/auth.guard';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { SuperAdminDashboardComponent } from './SuperAdmin/SuperDashboard/super-admin-dashboard/super-admin-dashboard.component';
import { AdminListComponent } from './SuperAdmin/Admin/admin-list/admin-list.component';
import { CategoryListComponent } from './SuperAdmin/Category/category-list/category-list.component';
import { SalonListComponent } from './SuperAdmin/Saolon/salon-list/salon-list.component';
import { AddSalonsComponent } from './SuperAdmin/Saolon/add-salons/add-salons.component';
import { AddEditAdminComponent } from './SuperAdmin/Admin/add-edit-admin/add-edit-admin.component';
import { AddEditCategoryComponent } from './SuperAdmin/Category/add-edit-category/add-edit-category.component';
import { BannerListComponent } from './SuperAdmin/Banners/banner-list/banner-list.component';
import { AddEditBannerComponent } from './SuperAdmin/Banners/add-edit-banner/add-edit-banner.component';
import { BannerDetailComponent } from './SuperAdmin/Banners/banner-detail/banner-detail.component';




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
     { path: 'salon-list/add-salon', component: AddSalonsComponent},
     { path: 'admin-list', component: AdminListComponent},
     { path: 'admin-list/add-edit-admin',component: AddEditAdminComponent},
     { path: 'category-list', component: CategoryListComponent},
     { path: 'category-list/add-edit-category', component: AddEditCategoryComponent},
     { path: 'banner-list', component: BannerListComponent},
     { path: 'banner-list/add-edit-banner', component: AddEditBannerComponent},
     { path: 'banner-list/banner-detail/:id', component: BannerDetailComponent},

    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

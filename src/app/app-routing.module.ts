import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Shared/auth.guard';
import { environment } from 'src/environments/environment';



const AuthModule = () => import('./Pages/auth/auth.module').then(x => x.AuthModule);
const HomeModule = () => import('./Pages/Home/home.module').then(x => x.HomeModule);


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: AuthModule,  canActivate: [AuthGuard]
  },  
  {
    path: 'super-Admin-Dashboard',
    loadChildren: HomeModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
  !environment.production ? { enableTracing: false, useHash: true, scrollPositionRestoration: 'enabled' } : { scrollPositionRestoration: 'enabled', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

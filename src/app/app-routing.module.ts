import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const AuthModule = () => import('./Pages/auth/auth.module').then(x => x.AuthModule);
const HomeModule = () => import('./Pages/home/home.module').then(x => x.HomeModule);


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: AuthModule, 
  },
  {
    path: 'dashboard',
    loadChildren: HomeModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

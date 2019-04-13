import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path : 'home', canActivate : [AuthGuardService], loadChildren : './pages/home/home.module#HomePageModule'},
  { path: 'profile', canActivate : [AuthGuardService], loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'products', canActivate : [AuthGuardService], loadChildren: './pages/products/products.module#ProductsPageModule' },
  { path: 'products/:id', canActivate : [AuthGuardService], loadChildren: './pages/product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'shopping-bag', canActivate : [AuthGuardService], loadChildren: './pages/shopping-bag/shopping-bag.module#ShoppingBagPageModule' },
  { path: 'product-modal', canActivate : [AuthGuardService], loadChildren: './modals/product-modal/product-modal.module#ProductModalPageModule' },
  { path: 'about', canActivate : [AuthGuardService], loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'appointment', canActivate : [AuthGuardService], loadChildren: './pages/appointment/appointment.module#AppointmentPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

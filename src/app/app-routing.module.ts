import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path : 'home', loadChildren : './pages/home/home.module#HomePageModule'},
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'products', loadChildren: './pages/products/products.module#ProductsPageModule' },
  { path: 'products/:id', loadChildren: './pages/product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'shopping-bag', loadChildren: './pages/shopping-bag/shopping-bag.module#ShoppingBagPageModule' },
  { path: 'product-modal', loadChildren: './modals/product-modal/product-modal.module#ProductModalPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  { path: 'appointment', loadChildren: './pages/appointment/appointment.module#AppointmentPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

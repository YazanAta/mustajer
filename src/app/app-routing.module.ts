import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './services/guards/auth.guard';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { adminGuard } from './services/guards/admin.guard';
import { userGuard } from './services/guards/user.guard';
import { AboutComponent } from './components/about/about.component';
import { PostInfoComponent } from './components/post-info/post-info.component';

const routes: Routes = [
  {path: '', component:LandingComponent},
  {path: 'login', component: LoginComponent, canActivate: [userGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [userGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'forget-password', component: ForgetPasswordComponent, canActivate: [userGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [adminGuard] },
  {path: 'about', component: AboutComponent},
  { path: 'post-info/:id/:userId', component: PostInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

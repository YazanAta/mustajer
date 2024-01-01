import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { environment } from 'src/enviroments/enviroment';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { TapToTopComponent } from './shared/components/tap-to-top/tap-to-top.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { PostInfoComponent } from './components/post-info/post-info.component';
import { FeedbackDialogComponent } from './components/about/feedback-dialog/feedback-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavComponent,
    LandingComponent,
    ProfileComponent,
    AddPostComponent,
    WishlistComponent,
    TapToTopComponent,
    PaymentComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    AboutComponent,
    PostInfoComponent,
    FeedbackDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TapToTopComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

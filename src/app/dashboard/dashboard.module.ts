import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminSignupComponent } from './pages/admin-signup/admin-signup.component';
import { AdminNotFoundComponent } from './pages/admin-not-found/admin-not-found.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    AdminLoginComponent,
    AdminSignupComponent,
    AdminNotFoundComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }

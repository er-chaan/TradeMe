import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { X404Component } from './x404/x404.component';
import { ForgotComponent } from './forgot/forgot.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, X404Component, ForgotComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PagesRoutingModule
  ],
  exports: [LoginComponent, RegisterComponent, X404Component, ForgotComponent],
})
export class PagesModule { }

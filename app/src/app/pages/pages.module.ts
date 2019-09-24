import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { X404Component } from './x404/x404.component';
import { X500Component } from './x500/x500.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, X404Component, X500Component],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  exports: [LoginComponent, RegisterComponent, X404Component, X500Component],
})
export class PagesModule { }
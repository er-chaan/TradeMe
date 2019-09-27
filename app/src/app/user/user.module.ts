import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from "../layout/layout.module";
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from "./user.component";
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [UserComponent, DashboardComponent],
  imports: [
    LayoutModule,
    CommonModule,
    UserRoutingModule
  ],
  bootstrap: [UserComponent]
})
export class UserModule { }

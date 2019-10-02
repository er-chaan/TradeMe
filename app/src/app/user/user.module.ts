import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from "../layout/layout.module";
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from "./user.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [UserComponent, DashboardComponent, SettingsComponent, SidebarComponent],
  imports: [
    LayoutModule,
    CommonModule,
    UserRoutingModule
    ],
    providers:[]
  })
export class UserModule { }

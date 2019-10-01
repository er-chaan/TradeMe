import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LayoutModule } from "../layout/layout.module";
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from "./user.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { DashboardService } from "../services/dashboard.service";


@NgModule({
  declarations: [UserComponent, DashboardComponent, SettingsComponent, SidebarComponent],
  imports: [
    HttpClientModule,
    LayoutModule,
    CommonModule,
    UserRoutingModule
    ],
    providers:[DashboardService]
  })
export class UserModule { }

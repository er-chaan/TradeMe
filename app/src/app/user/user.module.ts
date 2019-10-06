import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from "../layout/layout.module";
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from "./user.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccountsComponent } from './accounts/accounts.component';
import { InplayComponent } from './inplay/inplay.component';

@NgModule({
  declarations: [UserComponent, DashboardComponent, SettingsComponent, SidebarComponent, AccountsComponent, InplayComponent],
  imports: [
    LayoutModule,
    CommonModule,
    UserRoutingModule
    ],
    providers:[]
  })
export class UserModule { }

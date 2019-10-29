import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from "../layout/layout.module";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, SettingsComponent, SidebarComponent, UsersComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule,
    LayoutModule
    ]
  })

export class AdminModule { }

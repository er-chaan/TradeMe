import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from "../layout/layout.module";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, SettingsComponent, SidebarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from "../layout/layout.module";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }

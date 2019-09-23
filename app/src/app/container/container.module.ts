import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ContainerRoutingModule
  ],
  exports: [DashboardComponent],
})
export class ContainerModule { }

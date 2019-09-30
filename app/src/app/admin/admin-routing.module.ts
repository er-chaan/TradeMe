import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./index";
import { DashboardComponent } from "./index";
import { SettingsComponent } from "./index";

const routes: Routes = [
  {
    path: "", component: AdminComponent, children: [
      { path: "settings", component: SettingsComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "", redirectTo: "\dashboard", pathMatch: "full" },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

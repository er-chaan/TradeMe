import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from "./index";
import { DashboardComponent } from "./index";
import { AnalyticsComponent } from "./index";
import { InplayComponent } from "./index";
import { AccountsComponent } from "./index";
import { SettingsComponent } from "./index";

const routes: Routes = [
  {
    path: "", component: UserComponent, children: [
      { path: "settings", component: SettingsComponent },
      { path: "accounts", component: AccountsComponent },
      { path: "inplay", component: InplayComponent },
      { path: "analytics", component: AnalyticsComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "", redirectTo: "\dashboard", pathMatch: "full" },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

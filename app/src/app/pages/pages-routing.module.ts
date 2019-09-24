import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent, X404Component, X500Component, ForgotComponent } from "./index";

const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "forgot", component: ForgotComponent },
  { path: "home", component: LoginComponent },
  { path: "", redirectTo: "\home", pathMatch:"full" },
  { path: "**", component: X404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

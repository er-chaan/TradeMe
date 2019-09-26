import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent, ForgotComponent } from "./index";

const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "forgot", component: ForgotComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "\login", pathMatch:"full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

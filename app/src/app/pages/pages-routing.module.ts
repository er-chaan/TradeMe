import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousGuard } from "../services/anonymous.guard";
import { LandingComponent, LoginComponent, RegisterComponent, ForgotComponent, AdminLoginComponent } from "./index";

const routes: Routes = [
  { path: "admin/login", component: AdminLoginComponent, canActivate: [AnonymousGuard] },
  { path: "register", component: RegisterComponent, canActivate: [AnonymousGuard] },
  { path: "forgot", component: ForgotComponent, canActivate: [AnonymousGuard] },
  { path: "login", component: LoginComponent, canActivate: [AnonymousGuard] },
  { path: "", component: LandingComponent, canActivate: [AnonymousGuard] },
  // { path: "", redirectTo: "\login", pathMatch:"full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

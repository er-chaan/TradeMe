import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousGuard } from "../services/anonymous.guard";
import { LoginComponent, RegisterComponent, ForgotComponent } from "./index";

const routes: Routes = [
  { path: "register", component: RegisterComponent, canActivate: [AnonymousGuard] },
  { path: "forgot", component: ForgotComponent, canActivate: [AnonymousGuard] },
  { path: "login", component: LoginComponent, canActivate: [AnonymousGuard] },
  { path: "", redirectTo: "\login", pathMatch:"full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

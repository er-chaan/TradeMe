import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminGuard } from "./services/admin.guard";
import { UserGuard } from "./services/user.guard";
import { X404Component } from "./pages/index";

const routes: Routes = [
  { path: "", loadChildren: "./pages/pages.module#PagesModule" },
  { path: "admin", loadChildren: "./admin/admin.module#AdminModule", canActivate: [AdminGuard] },
  { path: "user", loadChildren: "./user/user.module#UserModule", canActivate: [UserGuard] },
  { path: "**", component: X404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

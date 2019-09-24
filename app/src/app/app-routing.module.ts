import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
import { AdminGuard } from "./services/admin.guard";
import { UserGuard } from "./services/user.guard";

const routes: Routes = [
  { path: "", loadChildren: "./pages/pages.module#PagesModule" },
  { path: "admin", loadChildren: "./admin/admin.module#AdminModule", canLoad: [AdminGuard] },
  { path: "user", loadChildren: "./user/user.module#UserModule", canLoad: [UserGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

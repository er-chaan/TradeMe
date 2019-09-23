import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PagesModule } from "./pages/pages.module";
import { LayoutModule } from "./layout/layout.module";
import { ContainerModule } from "./container/container.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    LayoutModule,
    ContainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

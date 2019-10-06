import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from "./pages/pages.module";

import { InterceptorService } from "./services/interceptor.service";
import { ErrorService } from "./services/error.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),
    NgxSpinnerModule,
    HttpClientModule,
    PagesModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,  
    BrowserModule
  ],
  providers: [
    ErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

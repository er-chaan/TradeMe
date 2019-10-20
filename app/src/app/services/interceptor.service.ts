import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Component } from '@angular/core';

@Component({
  template: '<ngx-spinner name="mySpinner"></ngx-spinner>',
})

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  token:any;
  mobile:any;

  constructor(private spinner: NgxSpinnerService,private toastr: ToastrService) {}

  intercept(req, next){
    this.spinner.show("mySpinner", {
      type: "line-scale-party",
      size: "large",
      bdColor: "rgba(51,51,51,0.8)",
      color: "white"
    });

    this.token = 'x';
    this.mobile = 'x';
  
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.mobile = localStorage.getItem('mobile');
    }
    if(sessionStorage.getItem('token')){
      this.token = sessionStorage.getItem('token');
      this.mobile = sessionStorage.getItem('mobile');
    }

    let tokenizedReq = req.clone({
      setHeaders: {
        "token" : this.token,
        "mobile" : this.mobile
      }
    });

    return next.handle(tokenizedReq).pipe(
      tap(
        event => {
          // this.toastr.success('', 'SUCCESS');
          this.spinner.hide("mySpinner");
        },
        error => {
          this.spinner.hide("mySpinner");
          this.toastr.error(error.error.message ,'ERROR');
        }
      )
    );

  }

}
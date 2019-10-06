import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Component } from '@angular/core';

// @Component({
//   template: '<ngx-spinner name="mySpinner"></ngx-spinner>',
// })

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  token:any;
  constructor(private spinner: NgxSpinnerService,private toastr: ToastrService) {}

  intercept(req, next){
    this.spinner.show("mySpinner", {
      type: "line-scale-party",
      size: "large",
      bdColor: "rgba(51,51,51,0.8)",
      color: "white"
    });
    console.log("==INTERCEPTOR CALLED==");
    // if(sessionStorage.getItem('token')){
    //   this.token = sessionStorage.getItem('token')
    // }else{
    //   this.token = "0";
    // }
    // console.log(this.token);
    let tokenizedReq = req.clone({
      // setHeaders: {
      //   Authorization : this.token
      // }
    });
    this.spinner.hide("mySpinner");

    return next.handle(tokenizedReq).pipe(
      tap(
        event => {
          // this.toastr.success(event, 'SUCCESS');
        },
        error => {
          this.toastr.error(error.message ,'ERROR');
        }
      )
    );

  }

}
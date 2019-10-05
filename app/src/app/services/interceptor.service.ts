import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  token:any;
  constructor(private toastr: ToastrService) {}

  intercept(req, next){
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
    })

    return next.handle(tokenizedReq).pipe(
      tap(
        event => {
          // this.toastr.success(event, 'SUCCESS');
        },
        error => {
          this.toastr.error(error.message,'ERROR');
        }
      )
    );

  }

}
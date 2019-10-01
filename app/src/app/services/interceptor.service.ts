import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  token:any;
  constructor() { }

  intercept(req, next){
    console.log("==INTERCEPTOR CALLED==");
    // if(sessionStorage.getItem('token')){
    //   this.token = sessionStorage.getItem('token')
    // }else{
    //   this.token = "0";
    // }
    // console.log(this.token);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization : this.token
      }
    })
    return next.handle(tokenizedReq);
  }

}
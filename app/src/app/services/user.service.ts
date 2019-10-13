import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api:any;
  constructor(private httpClient: HttpClient) {
    this.api = environment.api;
  }
  isUserLoggedIn(){
      if(localStorage.getItem('token')){
        return true;
      }else if(sessionStorage.getItem('token')){
        return true;
      }else{
        return false;
      }
      return false;
  }
  register(data:any){
    return this.httpClient.post<any>(this.api+"/users/register", data);
  }
  login(data:any){
    return this.httpClient.post<any>(this.api+"/users/login", data);
  }
  forgot(data:any){
    console.log(data);
    return this.httpClient.post<any>(this.api+"/users/forgot", data);
  }
  getSettings(data:any){
    return this.httpClient.get<any>(this.api+"/users/getSettings/"+data+"");
  }
  putSettings(data:any){
    return this.httpClient.put<any>(this.api+"/users/putSettings", data);
  }
}

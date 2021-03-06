import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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
    return this.httpClient.post<any>(this.api+"/auth/register", data);
  }
  login(data:any){
    return this.httpClient.post<any>(this.api+"/auth/login", data);
  }
  forgot(data:any){
    console.log(data);
    return this.httpClient.post<any>(this.api+"/auth/forgot", data);
  }
  getSettings(data:any){
    return this.httpClient.get<any>(this.api+"/users/getSettings/"+data+"");
  }
  putSettings(data:any){
    return this.httpClient.put<any>(this.api+"/users/putSettings", data);
  }
  getBalance(data:any){
    return this.httpClient.get<any>(this.api+"/users/getBalance/"+data+"");
  }
}

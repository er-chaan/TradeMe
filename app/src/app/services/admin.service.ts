import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  api:any;
  constructor(private httpClient: HttpClient) {
    this.api = environment.api;
  }
  isUserLoggedIn(){
    if(sessionStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
    return false;
  }
  login(data:any){
    return this.httpClient.post<any>(this.api+"/auth/loginX", data);
  }
  getSettings(data:any){
    return this.httpClient.get<any>(this.api+"/admin/getSettings/"+data+"");
  }
  putSettings(data:any){
    return this.httpClient.put<any>(this.api+"/admin/putSettings", data);
  }
  getUsers(){
    return this.httpClient.get<any>(this.api+"/admin/getUsers/");
  }
  controlUsers(data:any){
    return this.httpClient.post<any>(this.api+"/admin/controlUsers/", data);
  }
  getInplay(){
    return this.httpClient.get<any>(this.api+"/admin/getInplay/");
  }
}

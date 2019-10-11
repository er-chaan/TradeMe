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
  register(data:any){
    return this.httpClient.post<any>(this.api+"/users", data);
  }
  login(data:any){
    return this.httpClient.post<any>(this.api+"/users/login", data);
  }
  forgot(data:any){
    return this.httpClient.post<any>(this.api+"/users/forgot", data);
  }
}

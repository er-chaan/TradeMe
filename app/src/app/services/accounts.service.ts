import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  api:any;
  constructor(private httpClient: HttpClient) {
    this.api = environment.api;
  }

  passbook(data:any): Observable<any>{
    return this.httpClient.get<any>(this.api+"/accounts/passbook/"+data);
  }

  payin(data:any){
    return this.httpClient.post<any>(this.api+"/accounts/payin", data);
  }
  
  payout(data:any){
    return this.httpClient.post<any>(this.api+"/accounts/payout", data);
  }

}

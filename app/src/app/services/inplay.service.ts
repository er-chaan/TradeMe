import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class InplayService {
  api:any;
  constructor(private httpClient: HttpClient) { 
    this.api = environment.api;
  }
  getStockStatus(code:string){
    return this.httpClient.get<any>(this.api+"/stocks/companycode/"+code);
  }
  tradeBook(data:any){
    return this.httpClient.get<any>(this.api+"/inplay/tradebook/"+data);
  }
  buy(data:any){
    return this.httpClient.post<any>(this.api+"/inplay/buy/",data);
  }
  sell(data:any){
    return this.httpClient.post<any>(this.api+"/inplay/sell/",data);
  }
  exitTrade(data:any){
    return this.httpClient.post<any>(this.api+"/inplay/exitTrade/",data);
  }
}

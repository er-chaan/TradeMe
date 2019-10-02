import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }
  getIndices(): Observable<any>{
    // https://priceapi-aws.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3BNSX
    
    return this.httpClient.get<any>("https://priceapi-aws.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3BSEN");
  }
  getTopPerfomers(): Observable<any>{
    return this.httpClient.get<any>("https://money.rediff.com/updatense");
  }
}

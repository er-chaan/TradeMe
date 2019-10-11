import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  api:any;
  constructor(private httpClient: HttpClient) {
    this.api = environment.api;
  }
  getIndices(): Observable<any>{
    // return this.httpClient.get<any>("https://money.rediff.com/updateticker");
    return this.httpClient.get<any>(this.api+"/stocks/updateticker");
  }
  getTopPerfomers(): Observable<any>{
    // return this.httpClient.get<any>("https://money.rediff.com/updatense");
    return this.httpClient.get<any>(this.api+"/stocks/updatense");
  }
  getNseChart(): Observable<any>{
    // return this.httpClient.get<any>("https://money.rediff.com/money1/chartnseday_v2.php");
    return this.httpClient.get<any>(this.api+"/stocks/nsechart");
  }
}

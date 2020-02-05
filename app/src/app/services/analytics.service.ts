import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  api:any;
  constructor(private httpClient: HttpClient) {
    this.api = environment.api;
  }
  getUpTrend(): Observable<any>{
    return this.httpClient.get<any>(this.api+"/stocks/getUpTrend");
  }
  getDownTrend(): Observable<any>{
    return this.httpClient.get<any>(this.api+"/stocks/getDownTrend");
  }
}

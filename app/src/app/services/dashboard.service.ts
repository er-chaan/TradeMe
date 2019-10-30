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
    return this.httpClient.get<any>(this.api+"/stocks/updateticker");
  }
  getTopPerfomers(): Observable<any>{
    return this.httpClient.get<any>(this.api+"/stocks/updatebse");
  }
  getBseChart(): Observable<any>{
    return this.httpClient.get<any>(this.api+"/stocks/bsechart");
  }
}

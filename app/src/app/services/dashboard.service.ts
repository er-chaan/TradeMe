import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private httpClient: HttpClient) { }
  getIndices(): Observable<any>{
    return this.httpClient.get<any>("https://money.rediff.com/updateticker");
  }
  getTopPerfomers(): Observable<any>{
    return this.httpClient.get<any>("https://money.rediff.com/updatense");
  }
  getNseChart(): Observable<any>{
    return this.httpClient.get<any>("https://money.rediff.com/money1/chartnseday_v2.php");
  }
}

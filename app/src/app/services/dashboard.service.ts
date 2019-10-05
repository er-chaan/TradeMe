import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // https://money.rediff.com/money1/chart_compPage.php?companyCode=14030001&mode=day&exchange=BSE&output=csv
  // https://money.rediff.com/money1/currentstatus.php?companycode=14030001
  constructor(private httpClient: HttpClient) { }
  getIndices(): Observable<any>{
    return this.httpClient.get<any>("https://money.rediff.com/updateticker");
  }
  getTopPerfomers(): Observable<any>{
    return this.httpClient.get<any>("https://money.rediff.com/updatense");
  }
}

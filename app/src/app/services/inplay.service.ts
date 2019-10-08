import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class InplayService {

  constructor(private httpClient: HttpClient) { }
  getStockStatus(code:string): Observable<any>{
    return this.httpClient.get<any>("https://money.rediff.com/money1/currentstatus.php?companycode="+code);
  }
}

import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  indices:any;
  nseGainer:any;
  nseLoser:any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    setInterval(() => {
      this.getIndices();
      this.getTopPerfomers();
    }, 2000);
  }

  getIndices(){
    this.dashboardService.getIndices().subscribe(data => {this.indices=data.indices[1].LastTradedPrice;});
  }
  getTopPerfomers(){
    this.dashboardService.getTopPerfomers().subscribe(data => {this.nseGainer=data.nseGainer;
                                                              this.nseLoser=data.nseLoser;});
  }

}

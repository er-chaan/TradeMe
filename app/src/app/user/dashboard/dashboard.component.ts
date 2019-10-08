import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { Chart } from "chart.js";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  indices:any;
  nseGainer:any;
  nseLoser:any;
  nseChart:any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    setInterval(() => {
      this.getIndices();
      // this.getNseChart();
      this.getTopPerfomers();
      this.processChart();
    }, 2000);
  }

  getIndices(){
    this.dashboardService.getIndices().subscribe(data => {this.indices=data.indices[1].LastTradedPrice;});
  }
  getNseChart(){
    this.dashboardService.getNseChart().subscribe(data => {this.nseChart=data;console.log(data)});
    console.log("====="+this.nseChart+"=====");
  }
  getTopPerfomers(){
    this.dashboardService.getTopPerfomers().subscribe(data => {this.nseGainer=data.nseGainer;
                                                              this.nseLoser=data.nseLoser;});
  }
  processChart(){
    var ctx = $('#Chart');
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'price',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },
    options: {}
    });
  }

}

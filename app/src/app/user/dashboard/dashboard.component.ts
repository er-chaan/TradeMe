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
  nseActive:any;
  nseChart:any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
      this.getIndices();
      this.getTopPerfomers();
      this.getNseChart();
    setInterval(() => {
      this.getIndices();
      this.getTopPerfomers();
      this.getNseChart();
    }, 5000);
  }

  getIndices(){
    this.dashboardService.getIndices().subscribe(data => {
                            this.indices=data.indices[1];
                            this.nseActive=data.companyList.sensex;
                          });
  }
  getNseChart(){
    this.dashboardService.getNseChart().subscribe(data => {
        this.nseChart=data;
        this.processChart(this.nseChart);
      });
  }
  getTopPerfomers(){
    this.dashboardService.getTopPerfomers().subscribe(data => {this.nseGainer=data.nseGainer;
                                                              this.nseLoser=data.nseLoser;});
  }
  processChart(chart){
    var time = [];
    var price = [];
    for (let index = 0; index < chart.length; index++) {
      var x = (chart[index][0]).split(" ");
      if(x[1] != undefined)
      time.push(x[1]);
      price.push(parseFloat(chart[index][1]));
    }
    var ctx = $('#Chart');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: time,
        datasets: [{
            label: 'price',
            backgroundColor: "orange",
            data: price
        }]
    },
    options: {
      // animation: {
      //     duration: 5
      // }
    }
    });
  }

}

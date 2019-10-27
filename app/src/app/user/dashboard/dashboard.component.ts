import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { UserService } from "../../services/user.service";
import { Chart } from "chart.js";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  mobile:any;
  balance:any;
  indices:any;
  nseGainer:any;
  nseLoser:any;
  nseActive:any;
  nseChart:any;
  alive:any;
  constructor(private dashboardService: DashboardService, private userService:UserService) { }

  ngOnInit() {
    this.alive=true;
    if(localStorage.getItem('mobile')){
      this.mobile = localStorage.getItem('mobile');
    }
    if(sessionStorage.getItem('mobile')){
      this.mobile = sessionStorage.getItem('mobile');
    }
      this.getIndices();
      this.getTopPerfomers();
      this.getNseChart();
      this.getBalance();
    setInterval(() => {
      if(this.alive){
        this.getIndices();
        this.getTopPerfomers();
        this.getNseChart();
        this.getBalance();
      }
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
  getBalance(){
    this.userService.getBalance(this.mobile).subscribe(response => {
        this.balance=response.data.balance;
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
    var ctx = $('.Chart1');
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
      animation: {
          duration: 20
      }
    }
    });

    var ctx = $('.Chart2');
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
      animation: {
          duration: 20
      }
    }
    });

  }

  ngOnDestroy(){
    this.alive=false;
  }
}

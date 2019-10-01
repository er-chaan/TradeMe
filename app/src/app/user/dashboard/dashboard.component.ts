import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  indices:any;
  topPerformers:any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getIndices();
    this.getTopPerfomers();
  }

  getIndices(){
    this.dashboardService.getIndices().subscribe(data => {this.indices=data;console.log(data)});
    // console.log(this.indices);
  }
  getTopPerfomers(){
    this.dashboardService.getTopPerfomers().subscribe(data => {this.topPerformers=data.nseGainer;console.log(data)});
    // console.log(this.topPerformers);
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from "../../services/analytics.service";
import { UserService } from "../../services/user.service";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, OnDestroy  {
  mobile:any;
  upTrend:any;
  downTrend:any;
  alive:any;
  constructor(private analyticsService: AnalyticsService, private userService:UserService) { }
  ngOnInit() {
    this.alive=true;
    if(localStorage.getItem('mobile')){
      this.mobile = localStorage.getItem('mobile');
    }
    if(sessionStorage.getItem('mobile')){
      this.mobile = sessionStorage.getItem('mobile');
    }
    this.getUpTrend();
    this.getDownTrend();
    setInterval(() => {
      if(this.alive){
        this.getUpTrend();
        this.getDownTrend();
      }
    }, 10000);
  }

  getUpTrend(){
    this.analyticsService.getUpTrend().subscribe(response => {
                            this.upTrend=response.data;
                          });
  }

  getDownTrend(){
    this.analyticsService.getDownTrend().subscribe(response => {
                            this.downTrend=response.data;
                          });
  }
  
  ngOnDestroy(){
    this.alive=false;
  }

}

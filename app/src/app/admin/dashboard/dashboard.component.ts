import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from "../../services/admin.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  alive:any;
  mobile:any;
  usersData:any;
  totalDeposit:number;
  totalUsers:any;
  inplayData:any;
  totalNet:number;
  openTrades:any;
  closedTrades:any;

  constructor(private adminService:AdminService) { }

  ngOnInit() {
    if(sessionStorage.getItem('mobile')){
      this.mobile = sessionStorage.getItem('mobile');
    }
    this.getUsers();
    this.getInplay();
    this.alive=true;
    setInterval(() => {
      if(this.alive){
        this.getUsers();
        this.getInplay();
      }
    }, 5000);
  }

  getUsers(){
    this.adminService.getUsers().subscribe(data => {
      this.usersData = data.data;
      this.totalUsers = this.usersData.length;
      this.totalDeposit=0;
      for (let index = 0; index < this.usersData.length; index++) {
        this.totalDeposit = this.totalDeposit + parseFloat(this.usersData[index].balance);
      }
    });
  }

  getInplay(){
    this.adminService.getInplay().subscribe(data => {
      this.inplayData = data.data;
      this.totalNet=0;
      this.openTrades=0;
      this.closedTrades=0;
      for (let index = 0; index < this.inplayData.length; index++) {
        this.totalNet = parseFloat( this.totalNet + this.inplayData[index].net );
        if(this.inplayData[index].status == 'open'){
          this.openTrades++;
        }
        if(this.inplayData[index].status == 'closed'){
          this.closedTrades++;
        }
      }
      if(this.totalNet < 0){
        this.totalNet = Math.abs(this.totalNet);
      }else{
        this.totalNet = -Math.abs(this.totalNet);
      }
    });
  }

  ngOnDestroy(){
    this.alive=false;
  }

}

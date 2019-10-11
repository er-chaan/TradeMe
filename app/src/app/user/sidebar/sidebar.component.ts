import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userObj:any;
  constructor() { }

  ngOnInit() {
    this.userObj = localStorage.getItem('session');
    console.log(this.userObj.mobile);
  }

}

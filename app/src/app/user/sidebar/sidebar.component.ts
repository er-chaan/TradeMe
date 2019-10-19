import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  mobile:any;
  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      $('.rNav').on('click',function(){
        // console.log($( window ).width()+"--"+$( document ).width())
        if(parseInt($(window).width()) < 767){
          $('.sidebar-toggle').trigger('click');
        }
      });
    });

    if(localStorage.getItem('mobile')){
      this.mobile = localStorage.getItem('mobile');
    }
    if(sessionStorage.getItem('mobile')){
      this.mobile = sessionStorage.getItem('mobile');
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('mobile');
    localStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('mobile');
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.toastr.success('successfully logout' ,'SUCCESS');
  }
}

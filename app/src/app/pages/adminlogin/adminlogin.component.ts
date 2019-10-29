import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminLoginComponent implements OnInit {
  data:any;
  loginForm:FormGroup;
  mobileError:any;
  passwordError:any;

  constructor(private formBuilder:FormBuilder, private adminService:AdminService, private router:Router) { }

  ngOnInit() {
    this.mobileError=false;
    this.passwordError=false;
    this.loginForm = this.formBuilder.group({
      mobile : ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      password:["",[Validators.required]],
    });
  }
  get f() { return this.loginForm.controls; }
  login(){
    this.mobileError=false;
    this.passwordError=false;
    if(this.loginForm.invalid){
      if(this.f.mobile.errors){
        this.mobileError = "invalid mobile";
      }
      if(this.f.password.errors){
        this.passwordError = "invalid password";
      }
      return;
    }
    if(this.loginForm.valid){
      this.adminService.login(this.loginForm.value).subscribe(data => {
        this.data = data;
        localStorage.clear();
        sessionStorage.clear();
        sessionStorage.setItem('admin','true');
        sessionStorage.setItem('mobile',this.data.mobile);
        sessionStorage.setItem('token',this.data.token);
        this.router.navigate(['/admin/dashboard/']);
      }, error=>{});
    }
  }

}

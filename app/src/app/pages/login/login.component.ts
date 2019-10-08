import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  mobileError:any;
  passwordError:any;

  constructor(private formBuilder:FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.mobileError=false;
    this.passwordError=false;
    this.loginForm = this.formBuilder.group({
      mobile : ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      password:["",[Validators.required]],
      terms:[""]
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
      this.userService.login(this.loginForm).subscribe(data => {
        localStorage.setItem('session',data);
        this.router.navigate(['/user/dashboard/']);
      }, error=>{});
    }
  }

}

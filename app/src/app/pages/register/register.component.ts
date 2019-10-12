import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data:any;
  registerForm:FormGroup;
  mobileError:any;
  emailError:any;
  passwordError:any;
  termsError:any;
  constructor(private formBuilder:FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.mobileError=false;
    this.emailError=false;
    this.passwordError=false;
    this.termsError=false;
    this.registerForm = this.formBuilder.group({
      mobile : ["9004313006", [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      email: ["er.chandreshbhai@gmail.com",[Validators.required, Validators.email]],
      password:["asdf@123",[Validators.required]],
      terms:[true,[Validators.required]]
    });
  }
  get f() { return this.registerForm.controls; }
  register(){
    this.mobileError=false;
    this.emailError=false;
    this.passwordError=false;
    this.termsError=false;
    if(this.registerForm.invalid){
      if(this.f.mobile.errors){
        this.mobileError = "invalid mobile";
      }
      if(this.f.email.errors){
        this.emailError = "invalid email";
      }
      if(this.f.password.errors){
        this.passwordError = "invalid password";
      }
      if(this.f.terms.errors){
        this.termsError = "accept terms";
      }
      return;
    }
    if(this.registerForm.valid){
      this.userService.register(this.registerForm.value).subscribe(data => {
        this.data = data;
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem('remember','true');
        localStorage.setItem('mobile',this.data.mobile);
        localStorage.setItem('token',this.data.token);
        this.router.navigate(['/user/dashboard/']);
      }, error=>{});
    }
  }

}

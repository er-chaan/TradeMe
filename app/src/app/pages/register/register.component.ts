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
      mobile : ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      email: ["",[Validators.required, Validators.email]],
      password:["",[Validators.required]],
      terms:["",[Validators.required]]
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
      console.log(this.registerForm.value);
      this.userService.register(this.registerForm.value).subscribe(data => {
        localStorage.setItem('session',data);
        this.router.navigate(['/user/dashboard/']);
      }, error=>{});
    }
  }

}

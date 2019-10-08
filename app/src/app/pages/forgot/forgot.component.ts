import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  forgotForm:FormGroup;
  emailError:any;
  isRecovered:any;

  constructor(private formBuilder:FormBuilder, private userService:UserService) { }

  ngOnInit() {
    this.isRecovered=false;
    this.emailError=false;
    this.forgotForm = this.formBuilder.group({
      email: ["",[Validators.required, Validators.email]],
    });
  }
  get f() { return this.forgotForm.controls; }
  forgot(){
    this.emailError=false;
    if(this.forgotForm.invalid){
      if(this.f.email.errors){
        this.emailError = "invalid mobile";
      }
      return;
    }
    if(this.forgotForm.valid){
      this.userService.forgot(this.forgotForm).subscribe(data => {}, error=>{});
      this.isRecovered="check your mail box";
    }
  }

}

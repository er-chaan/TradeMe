import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  forgotForm:FormGroup;
  emailError:any;
  isRecovered:any;

  constructor(private formBuilder:FormBuilder, private userService:UserService, private toastr: ToastrService) { }

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
        this.emailError = "invalid email";
      }
      return;
    }
    if(this.forgotForm.valid){
      this.userService.forgot(this.forgotForm.value).subscribe(data => {
        this.isRecovered=data.message;
        this.toastr.success(data.message, 'SUCCESS');
        }, error=>{});
    }
  }

}

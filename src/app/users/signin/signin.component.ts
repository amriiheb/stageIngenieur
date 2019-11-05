import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { User } from '../models/user';
import { AuthGuardService } from '../auth-guard.service';
import { ErrorMsg } from '../models/ErrMsg';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
 errorMsg:ErrorMsg=new ErrorMsg();
  signinForm: FormGroup;
isadmin :boolean ;
  constructor(private formBuilder: FormBuilder,private router: Router,private userService :UserServiceService,private authGuard :AuthGuardService) { }

  ngOnInit() {
    this.initForm();
    console.log(this.authGuard.isAut) ;
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    this.errorMsg.login=this.errorMsg.password=this.errorMsg.msg="" ;
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

     var user  =new User() ;
     user.login=email ;
     user.password=password ;
     !user.login ?this.errorMsg.login="Login required" :'' ;
     !user.password ? this.errorMsg.password="Password required " :'' ;
     if(!user.login || !user.password){
      return
    }
    if (this.validateEmail(email)) {

    this.userService.signInUser1(user).subscribe(
      (res) => {
        this.authGuard.Profile=res ;
        this.isadmin=this.authGuard.Profile.isadmin ;
        
        if(this.isadmin==true){
          this.authGuard.isAut=true  ;
          this.router.navigate(['users']) ;
        }
         else{
           this.authGuard.isAut=true  ;
           this.router.navigate(['User/Tasks']);
         }
        
       
      },
      (error) => {
        this.errorMsg.msg = "Email Or Password incorrect";
      }
    );
    }
    else{
      this.errorMsg.login="format mail invalide"
    }
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

}

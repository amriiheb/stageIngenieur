import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../models/user';
import { ErrorMsg } from '../models/ErrMsg';
import { UserServiceService } from '../user-service.service';
import { AuthGuardService } from '../auth-guard.service';
import { reject } from 'q';
import { UserTaskListComponent } from 'src/app/tasks/user-task-list/user-task-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  user :User=new User() ;
  users :any ;
  errorMsg:ErrorMsg=new ErrorMsg() ;
  editUser :User=new User() ;
  id ={ 'id':''} ;
  errorMsg1 :any ;
  constructor(private modalService: BsModalService,private userService:UserServiceService,private authguard :AuthGuardService,private router:Router){}

   ngOnInit() {
    console.log(this.authguard.isAut) ;
  }
  
Onsave(){
  this.errorMsg.login = this.errorMsg.login="";
  !this.user.login ?this.errorMsg.login="Name requireq" :'' ;
  !this.user.password ? this.errorMsg.password="Adress required " :'' ;
  if(!this.user.login || !this.user.password){
    return
  }
     this.userService.createNewUser(this.user).subscribe(
       ()=>{
         this.user=new User ;
        
       },
       (error)=>{
         reject(error) ;
         this.errorMsg1=error ;
       }
     );
   }
  SwitchToAdmin(){
    
     if(this.user.isadmin==false){
      this.user.isadmin=true ;
      console.log(this.user.isadmin) ;

    }
    else if(this.user.isadmin==true){
             this.user.isadmin=false ;
            console.log(this.user.isadmin) ;
    }
  }

}

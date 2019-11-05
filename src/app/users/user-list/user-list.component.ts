import { Component, OnInit,TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import{UserServiceService} from '../user-service.service' ;
import { resolve, reject } from 'q';
import { User } from '../models/user';
import { ErrorMsg } from '../models/ErrMsg';
import { promise } from 'protractor';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  modalRef: BsModalRef;
  user :User=new User() ;
  users :any ;
  errorMsg:ErrorMsg=new ErrorMsg() ;
  editUser :User=new User() ;
  id ={ 'id':''} ;
  errorMsg1 :any ;
  userToDeleate:User =new User() ;
  constructor(private modalService: BsModalService,private userService:UserServiceService,private authguard :AuthGuardService){}
  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModalDelete(template: TemplateRef<any>,id) {
    console.log(id) ;
    this.userToDeleate.userId=id ;
     this.id.id=id ;
     console.log(this.id) ;
    this.modalRef = this.modalService.show(template);
  }
  openModalEdit(template: TemplateRef<any>,user :User) {
    this.editUser=user;
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
    this.getUser() ;
    console.log(this.authguard.isAut) ;
  }
 public getUser(){
    this.userService.get().subscribe(
      res =>{
        this.users=res ;

         console.log(this.users);
      },
      err =>{
        console.log(err) ;
      }
    ) 
    ;
  }


  onEdit(){
    this.errorMsg.password = this.errorMsg.login=this.errorMsg.name="";
    !this.editUser.login ?this.errorMsg.login="Login required" :'' ;
    !this.editUser.password ? this.errorMsg.password="Password required " :'' ;
    !this.editUser.name ?this.errorMsg.name="Name Required" :'' ;
    if(!this.editUser.login || !this.editUser.password || !this.editUser.name){
      return
    }
    const email=this.editUser.login ;

    if (this.validateEmail(email)) {
    this.userService.edit(this.editUser).subscribe(
      res=>{
        this.getUser() ;
        this.modalRef.hide() ;
           console.log(res) ;
      },
      error =>{
        console.log(error) ;
      }
    )
    }
    else{
      this.errorMsg.login="format mail invalide"
    }
  }

onDelete(){
  this.userService.delete(this.userToDeleate).subscribe(
    res =>{
      this.getUser() ;
      this.modalRef.hide() ;
      console.log(res) ;
    },
    err =>{
      console.log(err) ;
    }
    
  ) ;
}



Onsave(){
  this.errorMsg.password = this.errorMsg.login=this.errorMsg.name="";
  !this.user.login ?this.errorMsg.login="Login required" :'' ;
  !this.user.password ? this.errorMsg.password="Password required " :'' ;
  !this.user.name ?this.errorMsg.name="Name Required" :'' ;
  if(!this.user.login || !this.user.password || !this.user.name){
    return
  }
  const email=this.user.login ;
  if (this.validateEmail(email)) {

     this.userService.createNewUser(this.user).subscribe(
       ()=>{
         this.user=new User ;
         this.getUser() ;
         
       },
       (error)=>{
         reject(error) ;
         this.errorMsg1=error ;
       }
     );
      }
     else{
      this.errorMsg.login="format mail invalide"
    }
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
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  
}
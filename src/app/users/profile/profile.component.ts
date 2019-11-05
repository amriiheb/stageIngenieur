import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthGuardService } from '../auth-guard.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../models/user';
import { UserServiceService } from '../user-service.service';
import { Skill } from '../models/skill';
import { ErrorMsg } from '../models/ErrMsg';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  modalRef: BsModalRef;
  errorMsg:ErrorMsg=new ErrorMsg() ;
  editUser:User=new User() ;
  skill:Skill=new Skill() ;
  fileToUpload: File = null;
  skillsList:Array<Skill> =new Array<Skill> ();
  constructor(private modalService: BsModalService,private authGuard :AuthGuardService,private userService:UserServiceService) { }

  ngOnInit() {
    this.skillsList=this.authGuard.Profile.skills ;
  }
  openModalEdit(template: TemplateRef<any>) {
    this.editUser=this.authGuard.Profile;
    this.modalRef = this.modalService.show(template);
  }
  onAddSkill(){
    this.skillsList.push(this.skill);
    this.skill=new Skill() ;
  }
  deleteitemfromskills(i){
       this.skillsList.splice(i,1) ;
       console.log(this.skillsList) ;
  }

  onEdit(){
    this.errorMsg.login=this.errorMsg.password=this.errorMsg.name=this.errorMsg.age=this.errorMsg.Phone=this.errorMsg.profession='' ;
    !this.editUser.login?this.errorMsg.login='Login Required':'' ;
    !this.editUser.password?this.errorMsg.password='Password Required':'' ;
    !this.editUser.name ?this.errorMsg.name='Name Required':'' ;
    !this.editUser.age ?this.errorMsg.age='Age Required':'' ;
    !this.editUser.telnumber?this.errorMsg.Phone='Tel Number Required':'';
    !this.editUser.profession?this.errorMsg.profession='Profession Required':'' ;
    if(!this.editUser.age || !this.editUser.profession || !this.editUser.login || !this.editUser.password || !this.editUser.telnumber ||!this.editUser.name ){
      return
    }
    const email=this.editUser.login ;

    if (this.validateEmail(email)) {

    this.editUser.skills=this.skillsList ;
    this.userService.edit(this.editUser).subscribe(
      res=>{
        this.modalRef.hide() ;
           console.log(res) ;
      },
      error =>{
        console.log(error) ;
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

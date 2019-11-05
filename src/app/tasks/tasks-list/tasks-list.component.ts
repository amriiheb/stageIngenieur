import { Component, OnInit,TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { resolve, reject } from 'q';
import { promise } from 'protractor';
import { Task } from '../models/task.model';
import { TasksServicesService } from '../tasks-services.service';
import { UserServiceService } from 'src/app/users/user-service.service';
import { UnderTask } from '../models/undertask';
import { User } from 'src/app/users/models/user';
import { ErrMsgT } from '../models/ErrMsgT';
import { isUndefined } from 'util';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  modalRef :BsModalRef ;
  viewTask:Task=new Task() ;
task :Task=new Task() ;
Tasks :any ;
users :any;
editTask :Task=new Task() ;
id={'id':''} ;
Rid2:any;
Rid:any ;
undertask:UnderTask=new UnderTask();
undertaskedit:UnderTask=new UnderTask() ;
 SelectedUser:User=new User() ;
 SelectedUser2:User=new User() ;
 SelectedUser3:any;
 SelectedUser4:User=new User() ;
 SelectedUser5:any;

underTasks:Array<UnderTask> =new Array<UnderTask> ();
taskTodeleate:Task=new Task() ;
undertasksedit1:Array<UnderTask>=new Array<UnderTask>() ;
errorMsg:ErrMsgT=new ErrMsgT();

constructor(private modalService :BsModalService,private TaskService :TasksServicesService,private UserService :UserServiceService){}
ngOnInit(){
  this.getTask() ;
  this.getUsers() ;
}
openModalView(template:TemplateRef<any>,task){
  this.viewTask=task ;
  this.modalRef=this.modalService.show(template)

}
openModalDelete(template :TemplateRef<any>,id){

  this.taskTodeleate.taskId=id
  console.log(this.taskTodeleate.taskId)
  this.modalRef=this.modalService.show(template) ;

}
openModalEdit(template :TemplateRef<any>,task :Task){
  console.log(task.underTask) ;
  this.undertasksedit1=task.underTask ;
  this.editTask=task ;
  this.editTask.responsible=task.responsible ;
  this.modalRef=this.modalService.show(template) ;
}
getTask(){
  console.log("1") ;
this.TaskService.get().subscribe(
  res=>{
    console.log("2") ;
    this.Tasks=res ;
    console.log(this.Tasks) ;
  },
  err =>{
    console.log(err) ;

  }
)
} ;
onEdit(){
  this.errorMsg.title = this.errorMsg.responsible=this.errorMsg.description=this.errorMsg.state=this.errorMsg.prioritie="";
  !this.editTask.title ?this.errorMsg.title="Title required" :'' ;
  !this.editTask.description ? this.errorMsg.description="Description required " :'' ;
  !this.editTask.prioritie ?this.errorMsg.prioritie=" Prioritie Required" :'' ;
  !this.editTask.state ?this.errorMsg.state="State Required":'' ;
  !this.Rid2 ||this.Rid2=='' ?this.errorMsg.responsible="Responsible Required":''
  if(!this.editTask.title|| !this.editTask.description || !this.editTask.state ||!this.editTask.prioritie ||!this.Rid2 ||this.Rid2==''){
    return
  }
  console.log(this.Rid2) ;
  this.SelectedUser4.userId=this.Rid2 ;
  this.UserService.getuserByid(this.SelectedUser4).subscribe(
    res=>{
      console.log('eeeeeee')
      console.log(res)
      this.SelectedUser5=res ;
      console.log(this.SelectedUser5)
      this.editTask.responsible=this.SelectedUser5 ;
      this.editTask.underTask=this.undertasksedit1 ;
    this.TaskService.edit(this.editTask).subscribe(

      res =>{
          this.getTask() ;
          console.log(res) ;
          this.Rid2='' ;
          this.modalRef.hide() ;
      },
      err=>{
           console.log(err) ; 
      }
    );
    },
    err=>{
      console.log(err) ;
    }
  );
  
          

   
  
 
}
onDelete(){
  this.TaskService.delete(this.taskTodeleate).subscribe(
    res =>{
      this.getTask() ;
      this.modalRef.hide() ;
      console.log(res) ;
    },
    err =>{
         console.log(err) ;
    }
  ) 
}
Onsave(data){
  this.errorMsg.title = this.errorMsg.responsible=this.errorMsg.description=this.errorMsg.state=this.errorMsg.prioritie="";
  !this.task.title ? this.errorMsg.title="Title required" :'' ;
  !this.task.description ? this.errorMsg.description="Description required " :'' ;
  !this.task.prioritie ?this.errorMsg.prioritie=" Prioritie Required" :'' ;
  !this.task.state ?this.errorMsg.state="State Required":'' ;

  !this.Rid ||this.Rid=='' ?this.errorMsg.responsible="Responsible Required":'' ;

  if(!this.task.title|| !this.task.description || !this.task.state ||!this.task.prioritie ||!this.Rid ||this.Rid==''){
    return
  }
  console.log(this.Rid) ;
this.SelectedUser2.userId=this.Rid
this.UserService.getuserByid(this.SelectedUser2).subscribe(
  res =>{
    this.SelectedUser3=res ;
    this.task.responsible=this.SelectedUser3 ;
  this.task.underTask=this.underTasks ;
  console.log(this.task.underTask) ;
  return this.TaskService.post(this.task).subscribe(
    res =>{
    console.log(res) ;
    this.getTask() ;
    this.task=new Task() ;
    this.underTasks =new Array<UnderTask> ();
    this.Rid='' ;
    this.errorMsg.responsible='';
    
  },
  err=>{
    console.log(err) ;
  })
  },
  err=>{
    console.log(err) ;
  }
 
)


}
getUsers(){
  return this.UserService.get().subscribe(
    res =>{
      console.log(res) ;
      this.users=res ;
    },
    err =>{
      console.log(err)
    }
  )
}
onAddUnderTask(){
  if(!this.undertask.title){
    return
  }
  this.underTasks.push(this.undertask)
  this.undertask=new UnderTask() ;
}
deleteitemfromunderTasks(i){
  this.underTasks.splice(i,1) ;
}
onAddUnderTask2(){
  if(!this.undertaskedit.title){
    return
  }
  this.undertasksedit1.push(this.undertaskedit)
  this.undertaskedit=new UnderTask() ;
}
deleteitemfromunderTasks2(i){
  this.undertasksedit1.splice(i,1) ;
}

onChangeUnderTaskState(i){
  if(this.underTasks[i].state==true){
    this.underTasks[i].state=false
  }
  else{
    this.underTasks[i].state=true ;
  }
  
}
onChangeUnderTaskedit1State(i){
  if(this.undertasksedit1[i].state==true){
    this.undertasksedit1[i].state=false
  }
  else{
          this.undertasksedit1[i].state=true ;
  }
}
}

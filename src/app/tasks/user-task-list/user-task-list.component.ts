import { Component, OnInit, TemplateRef } from '@angular/core';
import { Task } from '../models/task.model';
import { TasksServicesService } from '../tasks-services.service';
import { UserServiceService } from 'src/app/users/user-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthGuardService } from 'src/app/users/auth-guard.service';

@Component({
  selector: 'app-user-task-list',
  templateUrl: './user-task-list.component.html',
  styleUrls: ['./user-task-list.component.css']
})
export class UserTaskListComponent implements OnInit {

  modalRef :BsModalRef ;
  task :Task=new Task() ;
  Tasks :any ;
  users :any;
  editTask :Task=new Task() ;
  Rid:string ; 
  id:string ;
  taskM:Task=new Task ;
  viewTask:Task=new Task() ;
  constructor(private modalService :BsModalService,private TaskService :TasksServicesService,private UserService :UserServiceService,private authGuard :AuthGuardService){}
  ngOnInit(){
    
    this.taskM.responsible=this.authGuard.Profile ;
    console.log(this.taskM) ;
    this.getMyTasks() ;
  }
 
  getMyTasks(){

  this.TaskService.getMyTasks(this.taskM).subscribe(
    res=>{
      this.Tasks=res ;
      console.log(this.Tasks) ;
    },
    err =>{
      console.log(err) ;
  
    }
  )
  } ;
 
 
 
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
  openModalView(template :TemplateRef<any>,task:Task){
    this.viewTask=task ;
    this.modalRef=this.modalService.show(template) ;
    }
    onChangeStateviewTask(i){
      if(this.viewTask.underTask[i].state==false){
        this.viewTask.underTask[i].state=true;

      }
      else{
        this.viewTask.underTask[i].state=false ;
      }
    }

    onEdit(){
      
      this.viewTask.responsible=this. authGuard.Profile ;
        this.TaskService.edit(this.viewTask).subscribe(
    
          res =>{
              this.getMyTasks(); 
              this.modalRef.hide() ;
          },
          err=>{
               console.log(err) ; 
          }
        );
     
    }
}

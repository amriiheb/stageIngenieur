import { Injectable } from '@angular/core';
import { Task} from 'src/app/tasks/models/task.model';
import * as firebase from 'firebase' ;
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TasksServicesService {
 constructor(private http:HttpClient){}
 baseUrl='http://localhost:8080' ;
post(data){
  console.log(data) ;
  return this.http.post(this.baseUrl+'/api/SaveTask',data) ;
}
get(){
  console.log("1.1") ;
  return this.http.get(this.baseUrl+'/api/getTask') ;
}
edit(data){
  return this.http.post(this.baseUrl+'/api/UpdateTask',data) ;
}
delete(data){
  console.log('///') ;
  console.log(data) ;
    return this.http.post(this.baseUrl+'/api/deleteTask',data) ;
  
}
getUserByid(data){
  console.log("d,,d") ;
 console.log(data.userId) ;
    return this.http.post(this.baseUrl+'/api/getUserById',data);
}
getMyTasks(data){
  
  return this.http.post(this.baseUrl+'/api/getTasksById',data) ;
}

}


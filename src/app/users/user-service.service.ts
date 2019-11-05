import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import * as firebase from 'firebase' ;
import { UserListComponent } from './user-list/user-list.component';
import { Subject } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';
import { Route, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
 
  constructor(private http:HttpClient ,private authGuard :AuthGuardService,private router :Router ) { }
  baseUrl='http://localhost:8080' ;
  createNewUser(data){
    return this.http.post(this.baseUrl+'/api/SaveUser',data) ;
  }
  get(){
    return this.http.get(this.baseUrl+'/api/getUser') ;   
  }
  edit(data){
    return  this.http.post(this.baseUrl+'/api/UpdateUser',data) ;

  }
  delete(data){
    console.log(data) ;
     return this.http.post(this.baseUrl+'/api/deleteUser',data) ;
      }
      
      signOutUser() {
        this.authGuard.isAut=false ;
        this.router.navigate(['auth/signin']) ;
      }
      signInUser1(data){
        return  this.http.post(this.baseUrl+"/api/Login",data) ;
      }
      getuserByid(data){
        console.log(data) ;
        return this.http.post(this.baseUrl+"/api/getUserById",data)
      }
      saveImage(data){
          return this.http.post(this.baseUrl+'/api/saveImage',data)
      }
        

}

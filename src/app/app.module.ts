import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {HttpClientModule} from '@angular/common/http';
import{HttpModule} from '@angular/http' ;
import { SigninComponent } from './users/signin/signin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { UserServiceService } from './users/user-service.service';
import { AuthGuardService } from './users/auth-guard.service';
import { HeaderComponent } from './header/header.component';
import { UserTaskListComponent } from './tasks/user-task-list/user-task-list.component';
import { ProfileComponent } from './users/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    TasksListComponent,
    HeaderComponent,
    UserTaskListComponent  ,
    ProfileComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    HttpClientModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './users/signin/signin.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { AuthGuardService } from './users/auth-guard.service';
import { UserTaskListComponent } from './tasks/user-task-list/user-task-list.component';
import { ProfileComponent } from './users/profile/profile.component';


const routes: Routes = [
  
{path :'',redirectTo:'tasks',pathMatch:"full",canActivate:[AuthGuardService]},
{path:'users',loadChildren:'./users/users.module#UsersModule',canActivate:[AuthGuardService]},
{ path: 'auth/signin', component: SigninComponent },
{path :'tasks', canActivate:[AuthGuardService], component:TasksListComponent },
{path:'User/Tasks' ,canActivate:[AuthGuardService],component:UserTaskListComponent},
{path:'User/Profile',canActivate:[AuthGuardService],component:ProfileComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

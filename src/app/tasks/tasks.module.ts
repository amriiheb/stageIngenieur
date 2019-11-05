import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { UserTaskListComponent } from './user-task-list/user-task-list.component';


@NgModule({
  declarations: [TasksListComponent, UserTaskListComponent],
  imports: [
    CommonModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }

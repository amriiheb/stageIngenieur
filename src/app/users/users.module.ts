import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';
import { AddFormComponent } from './add-form/add-form.component';

@NgModule({
  declarations: [UserListComponent, AddFormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ModalModule.forRoot(),
    FormsModule
  ]
})
export class UsersModule { }

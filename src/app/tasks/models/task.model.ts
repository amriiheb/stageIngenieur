import { User } from 'src/app/users/models/user';
import { UnderTask } from './undertask';

export class Task {
  taskId:string ; 
  description: string ;  
   title: string; 
   responsible: User;
   state : string ;
   prioritie :string ;
   progression :string ;
   underTask:Array<UnderTask> ;
   
  }
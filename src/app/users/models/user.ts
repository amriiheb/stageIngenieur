import { Skill } from './skill';

export class User{
    userId :string ;
    login:string ;
    password:string ;
    name:string ;
    age :string ;
    state:string ;
    telnumber :string ;
    isadmin: boolean=false ;
    profession:string ;
    skills:Array<Skill> ;
    urlPhoto:string ;
}
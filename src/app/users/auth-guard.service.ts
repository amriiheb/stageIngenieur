import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase' ;
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isAut:boolean =false ;
  Profile :any ;
  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        


    return new Promise(
      (resolve, reject) => {
            if(this.isAut==true) {
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }

}

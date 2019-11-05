import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../users/user-service.service';
import { AuthGuardService } from '../users/auth-guard.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: UserServiceService,private authGuard :AuthGuardService) { }
  ngOnInit() {

  }

  onSignOut() {
    this.authService.signOutUser();
  }

}

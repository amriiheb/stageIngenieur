import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { UserServiceService } from './users/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'weekplan';
  constructor( private UserService :UserServiceService){
    var firebaseConfig = {
      apiKey: "AIzaSyBcSdI8RNVIrF4DAtaEotAjwHGbdvjbzFI",
      authDomain: "weekplan-e2603.firebaseapp.com",
      databaseURL: "https://weekplan-e2603.firebaseio.com",
      projectId: "weekplan-e2603",
      storageBucket: "gs://weekplan-e2603.appspot.com/",
      messagingSenderId: "189264140746",
      appId: "1:189264140746:web:3628dc8ba5453b4a"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  onSignOut(){
    this.UserService.signOutUser() ;
  }
  
}

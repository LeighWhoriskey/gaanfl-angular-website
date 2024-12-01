import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  //boolean for he html code to display admin or not
  isLoggedIn : boolean = false;

  constructor(authService : AuthService){
    //gets the value when a person logs in and set the local to true or false
    authService.isLoggedIn.subscribe(loggedIn =>{
      this.isLoggedIn = loggedIn;
    })
  }
}

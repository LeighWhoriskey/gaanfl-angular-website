import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private authService: AuthService){}
  //creates login form
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit(){
    //gets details from form and passes the data to the database using the authService
    this.authService.login((this.loginForm.value.email as string),
      (this.loginForm.value.password as string)).subscribe(response =>{
        if(response == 200){
          //sets the login for the nav to true
          this.authService.setLogin();
        }
      });
  }
}

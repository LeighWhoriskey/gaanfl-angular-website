import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router){}

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }
  
  login(email: string, password: string){
    return this.http.post("http://localhost:3000/login", {email, password});
  }

  logout(){
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  setLogin(){
    this.loggedIn.next(true);
    this.router.navigate(['/admin']);
  }
}

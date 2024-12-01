import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})

export class TeamsService {  

  url = `http://localhost:3000/teams`;

  constructor(private http: HttpClient)
  {
  }

  // getTeams here
  getTeams() : Observable<Team[]>{
    return this.http.get<Team[]>(this.url);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from './player';


@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  url = `http://localhost:3000/players`;
  url2 = `http://localhost:3000/playersWN`;

  constructor(private http: HttpClient)
  {
  }

  // getTeams here
  getPlayers() : Observable<Player[]>{
    return this.http.get<Player[]>(this.url);
  }
  getPlayersWN() : Observable<Player[]>{
    return this.http.get<Player[]>(this.url2);
  }
}

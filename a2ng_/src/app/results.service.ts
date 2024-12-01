import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Results } from './results';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  url = `http://localhost:3000/results`;

  constructor(private http: HttpClient)
  {
  }

  // getTeams here
  getResults() : Observable<any>{
    return this.http.get<any>(this.url);
  }

  getResultsbyId(id : number) : Observable<any>{
    //this might be a post not sure yet need to add the id for the team
    return this.http.get<any>(`${this.url}/${id}`);
  }

  updateResults(result : Results) : Observable<any>{
    
    return this.http.put<Results>(`${this.url}`,result);
  }
  
  deleteResult(id : number) : Observable<any>{
    return this.http.delete<Results>(`${this.url}/${id}`)
  }
}

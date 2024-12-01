import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { PlayersService } from '../players.service';
import { ResultsService } from '../results.service';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})

export class RoutesComponent {

  constructor(private teamService :TeamsService,
   private playerService :PlayersService,
   private resultService : ResultsService ){}

  //holds all data in text area
  textArea : any = "[]";

  onTeams(){
    //gets the data from teams and adds them to text area
    this.teamService.getTeams().subscribe(
      response =>{
        this.textArea = response;
      }
    );
  }

  onPlayers(){
    //gets the data from players and adds them to text area
    this.playerService.getPlayers().subscribe(
      response =>{
        this.textArea = response;
      }
    );
  }

  onResults(){
    //gets the data from results and adds them to text area
    this.resultService.getResults().subscribe(
      response =>{
        this.textArea = response;
      }
    );
  }

  onResultsDiv(){
    //gets the data from results by division and adds them to text area
    this.resultService.getResultsbyId(1).subscribe(
      response =>{
        this.textArea = response;
      }
    );
  }
}

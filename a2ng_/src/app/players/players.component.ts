import { Component } from '@angular/core';
import { Player } from '../player';
import { PlayersService } from '../players.service';
import { Team } from '../team';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {

  //array for players
  players : Player[] = [];
  //array for team names for dropdown
  teamName : Team[] = [];
  //filtered the players
  filteredData : Player[] =[];
  
  constructor(private playerService: PlayersService, private teamService: TeamsService){
    playerService.getPlayersWN().subscribe(response => {
      //adds all players 
      this.players = response;
      this.filteredData = response;
    });

    teamService.getTeams().subscribe(response =>{
      //adds all team names
      this.teamName = response;
    });
  }

  onDropdownChange(event : Event){
    //filteres data to dropdown value
    if((event.target as HTMLSelectElement).value == "All"){
      this.filteredData = this.players;
    }else{
      this.filteredData = this.players.filter(players => players.teamName === ((event.target as HTMLSelectElement).value)as String)
    }
  }
}

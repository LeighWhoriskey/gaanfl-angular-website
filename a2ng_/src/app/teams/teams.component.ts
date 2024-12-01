import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Team } from '../team';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})

export class TeamsComponent {

  teams : Team[] = [];

  constructor(private teamService: TeamsService){

    this.teamService.getTeams().subscribe(
      response => {
        this.teams = response;
      }
    )
  }
}

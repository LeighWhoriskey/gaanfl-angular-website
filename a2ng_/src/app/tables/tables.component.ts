import { Component } from '@angular/core';
import { Results } from '../results';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent {
  teamData : any[] = [];
  tableData : any[] = [];

  constructor(private resultService : ResultsService){
    resultService.getResultsbyId(1).subscribe(response =>{
      
      let table : any = {};

      response.forEach((result : Results)=>{

        if(parseInt(result.round,10) <= 4){
          this.teamData.push(result);
          
          if(!table[result.team1ID] ){
            table[result.team1ID] = {id: result.team1ID, team:result.team1, Pd:0, W:0, D:0, L:0, DIFF:0, Pts:0}
          }else if(!table[result.team2ID]){
            table[result.team2ID] = {id: result.team2ID,team:result.team2, Pd:0, W:0, D:0, L:0, DIFF:0, Pts:0}
          }
        }
      });
     
      this.tableData = this.getScores(table);
    });
  }

  getScores(data: any) {
    Object.keys(data).forEach(key =>{
      const team = data[key];
      this.teamData.forEach(result => {

        //checks if the team id is team 1 or team 2
        if (result.team1ID == team.id || result.team2ID == team.id) {
          let tmp1total = result.team1Points + (result.team1Goals * 3);
          let tmp2total = result.team2Points + (result.team2Goals * 3)
 
          //if the team id 
          if(result.team1ID == team.id ){
            
            if(tmp1total > tmp2total){
              team.W = team.W + 1;
            }else if(tmp1total == tmp2total){
                team.D = team.D + 1;
            }else{
              team.L = team.L + 1;
            }
            team.DIFF += tmp1total - tmp2total;
            team.Pd = team.Pd + 1;
          }else{
            if(tmp2total > tmp1total){
              team.W = team.W + 1;             
            } else if(tmp2total == tmp1total){
              team.D = team.D + 1;
            } else {
              team.L = team.L + 1;
            }
            team.DIFF += tmp2total - tmp1total;
            team.Pd = team.Pd + 1;
          }
          
        }
      });
    });

    Object.keys(data).forEach(key =>{
      const team = data[key];
      team.Pts = (team.W * 2) + team.D;
    });
    return Object.values(data).sort((a : any, b : any) => b.Pts - a.Pts || b.DIFF - a.DIFF);
  }
}

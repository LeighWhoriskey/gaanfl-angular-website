import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Results } from '../results';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {

  //unfiltered results array
  results : Results[] =[];
  //filtered results array
  filteredResults : Results[] =[];
  //rounds for dropdown, is string as rounds are sting in interface
  rounds : String[] = [];

  //formcontrol for dropdown 
  dropdownForm = new FormGroup({
    dropdown: new FormControl('1')
  });


  constructor(private resultService : ResultsService){

    resultService.getResults().subscribe(response =>{
      //saves the unfiltered data
      this.results = response;
      
      //adds the rounds to the rounds array and sorts them
      response.map((round: Results)=>{if(!this.rounds.includes(round.round)){this.rounds.push(round.round)}})
      this.rounds = this.rounds.sort((a:any, b:any) => a - b);

      //refilters the teams to display dat only with the indicated round ((1))
      this.filteredResults = this.results.filter((team) =>{

        if( team.round as String == this.dropdownForm.value.dropdown ){
          return team;
        }else{
          return;
        }
      });
    });
  }

  //when the dropdown changes it refilters the data with only the indicated round
  onDropdownChange(event: Event){
    this.filteredResults = this.results.filter((team) =>{

      if( team.round == (event.target as HTMLSelectElement).value){
        return team;
      }else{
        return;
      }
    });
  }

  //updates the result using the result service
  onUpdateClick(result : Results){
    this.resultService.updateResults(result).subscribe(response => {
      if(response === 200){
        alert("Data updated");
      }
    });
  }

  //deletes the result using the result id
  onDeleteClick(id :number){
    this.resultService.deleteResult(id).subscribe(response => console.log(response));
    window.location.reload();
  }
}

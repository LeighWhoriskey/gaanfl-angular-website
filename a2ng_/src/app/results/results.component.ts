import { Component } from '@angular/core';
import { Results } from '../results';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {

  //hold all results
  results : Results[] =[];
  //holds all filtered results for displaying
  filteredResults : Results[] = [];
  //hold rounds to be sorted through
  rounds : any[] = []

  //for displaying values n the buttons
  previousRound : string = "";
  nextRound : string = "";
  currentRound : string = "";

  constructor(private resultService: ResultsService){
    
    resultService.getResults().subscribe(response =>{
      //adds all results
      this.results = response;

      this.results.filter((result) => {
        //adds unique rounds to rounds array
        if(!this.rounds.includes(parseInt(result.round))){
          this.rounds.push(parseInt(result.round))
        }
      });
      //sorts the rounds to be in order
      this.rounds.sort((a,b) => a- b)
      //adds the values to the buttons 
      this.previousRound  = `<< Rounds ${this.rounds[this.rounds.length -1]}`;
      this.nextRound  = `${this.rounds[1]} Round >>`;
      this.currentRound = `Round ${this.rounds[0]}`;

      //gets the current round and removes everything but the number in the string
      var current = (this.currentRound.match(/\d+/g) || []).map(Number);
      //refilters the teams to display dat only with the indicated round
      this.filteredResults = this.filterResults(current[0]);
    });
      
  }

  next(){
    //change the buttons to the next round and move the previous up one.
    //also change the data displayed from the database
    var current = (this.currentRound.match(/\d+/g) || []).map(Number);
   
    //checks to see if the next round is the first round and changes values
    if(this.rounds.indexOf(current[0]) +1 >= this.rounds.length ){
      this.currentRound = `Round ${this.rounds[0]}`;
      this.nextRound = `${this.rounds[1]} Round >>`;
      this.previousRound = `<< Round ${this.rounds[this.rounds.length - 1]}`;
      
    }else{
      //if the next round is not the first round it changes normally
      this.currentRound = `Round ${this.rounds[this.rounds.indexOf(current[0]) +1]}`;

      if(this.rounds.indexOf(current[0]) + 2  == this.rounds.length){
        this.nextRound = `${this.rounds[0]} Round >>`;
      }else{
        this.nextRound = `${this.rounds[this.rounds.indexOf(current[0]) +2]} Round >>`;
      }
      
      this.previousRound = `<< Round ${this.rounds[this.rounds.indexOf(current[0])]}`;
    }

    current = (this.currentRound.match(/\d+/g) || []).map(Number);
      //refilters the teams to display dat only with the indicated round
      this.filteredResults = this.filterResults(current[0])

    
  }

  previous(){
    //same as above really
    var current = (this.currentRound.match(/\d+/g) || []).map(Number);
    if(this.rounds.indexOf(current[0]) -1 < 0){
      this.currentRound = `Round ${this.rounds[this.rounds.length - 1]}`;
      this.nextRound = `${this.rounds[0]} Round >>`;
      this.previousRound = `<< Round ${this.rounds[this.rounds.length - 2]}`;
    }else{
      //if the next round is not the first round it changes normally
      this.currentRound = `Round ${this.rounds[this.rounds.indexOf(current[0]) -1]}`;
      this.nextRound = `${this.rounds[this.rounds.indexOf(current[0]) ]} Round >>`;
      if(this.rounds.indexOf(current[0]) -2 <= 0){
        this.previousRound = `<< Round ${this.rounds.length}`;
      }else{
        this.previousRound = `<< Round ${this.rounds[this.rounds.indexOf(current[0]) -2]}`;
      }
    }

    current = (this.currentRound.match(/\d+/g) || []).map(Number);
    //refilters the teams to display dat only with the indicated round
    this.filteredResults = this.filterResults(current[0])
  }

  onKeyup(event: Event){
    //gets the current value in input box
    let value = (event.target as HTMLInputElement).value.toLowerCase();
    //gets the current round value and removes everything but the number
    let current = (this.currentRound.match(/\d+/g) || []).map(Number);
    if(value == ""){
      //returns all data of round if the value is empty
      this.filteredResults = this.filterResults(current[0])
    }else{
      //if team1 or team 2 contains the value passed in it will change the filtered results
      //to only ones containing the value
      this.filteredResults = this.filterResults(current[0]).filter((team) =>{
        if(team.team1.toLowerCase().includes(value) ||
        team.team2.toLowerCase().includes(value)){
          return team;
        }else{
          return;
        }
      });
    }
  }


  filterResults(round : number){
    //filters the rounds to only ones containg the current round value
    return this.results.filter((team) =>{
      if(team.round === round.toString()){
        return team;
      }else{
        return;
      }
    });
  }
}

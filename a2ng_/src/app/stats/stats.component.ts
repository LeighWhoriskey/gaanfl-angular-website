import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Team } from '../team';
import { TeamsService } from '../teams.service';
import * as d3 from 'd3';
import { ResultsService } from '../results.service';
import { Results } from '../results';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  //when the page loads it creates the svgs
  //did it this way as when i tried in constructor it couldnt find the div with ids
  ngOnInit() {
    this.createMatchSvg();
    this.createFormSvg();
  }

  //holds all team names
  teamNames : Team[] =[]
  //holds all data for all results
  results : Results[] = [];
  //holds data for filtered data
  filteredResults : Results[] =[];

  //for h2 headers which will change to team selected
  form = "Team Form"
  matchScores = "Team Match Scores"
  //for svgs
  matchSvg : any;
  formSvg : any;
  
  constructor(private teamService: TeamsService, private resultService : ResultsService){
    //gets all team names and adds them to dropdown
    teamService.getTeams().subscribe(response =>{
      this.teamNames = response
    });

    resultService.getResults().subscribe(response =>{
      //gets all results and only adds the ones 1-4
      response.forEach((result : Results)=>{
        if(parseInt(result.round,10) <= 4){
          this.results.push(result);
        }
      });
    });
  }

  //for the dropdown
  dropdownForm = new FormGroup({
    dropdown: new FormControl('select')
  });

  //creates the match svg
  createMatchSvg(){

    //svg
    this.matchSvg = d3.select("#matchSVG")
    .append("svg")
    .attr("width", 800)
    .attr("height", 400)
    .append("g")
    .attr("transform", "translate(25, 25)")

    //side line
    this.matchSvg.append('line')
    .attr('x1', 0) 
    .attr('y1', 0) 
    .attr('x2', 0) 
    .attr('y2', 400) 
    .attr('stroke', 'black') 
    .attr('stroke-width', 1) 
    .attr('stroke-dasharray', '5,5');

    //top line
    this.matchSvg.append('line')
    .attr('x1', 0) 
    .attr('y1', 375) 
    .attr('x2', 800) 
    .attr('y2', 375) 
    .attr('stroke', 'black') 
    .attr('stroke-width', 1) 
    .attr('stroke-dasharray', '5,5');

    //bottom line
    this.matchSvg.append('line')
    .attr('x1', 0) 
    .attr('y1', 0) 
    .attr('x2', 800) 
    .attr('y2', 0) 
    .attr('stroke', 'black') 
    .attr('stroke-width', 1) 
    .attr('stroke-dasharray', '5,5');
  }

  createFormSvg(){
    
    //svg
    this.formSvg = d3.select("#formSVG")
    .append("svg")
    .attr("width", 800)
    .attr("height", 400)
    .append("g")
    .attr("transform", "translate(25, 25)");

    //top line
    this.formSvg.append('line')
    .attr('x1', 0) 
    .attr('y1', 375) 
    .attr('x2', 800) 
    .attr('y2', 375) 
    .attr('stroke', 'black') 
    .attr('stroke-width', 1) 
    .attr('stroke-dasharray', '5,5');

    //bottom line
    this.formSvg.append('line')
    .attr('x1', 0) 
    .attr('y1', 0) 
    .attr('x2', 800) 
    .attr('y2', 0) 
    .attr('stroke', 'black') 
    .attr('stroke-width', 1) 
    .attr('stroke-dasharray', '5,5');

    //scale for left axis and numbers
    const yScale = d3.scaleLinear()
    .domain([0, 14])
    .range([360,0]);

    this.formSvg.call(d3.axisLeft(yScale));
  }

  updateMatchScoreChart(value : string){

    //clears svg data for new data
    d3.select("#matchSVG").selectAll("rect").remove();
    d3.select("#matchSVG").selectAll("text").remove();

    let maxValue = (d3.max(this.filteredResults, (d : any)=> Math.max(((d.team2Goals * 3) 
      +(d.team2Points )) * 15, ((d.team1Goals * 3) +(d.team1Points )) * 15))) as number

    //scale for y axis of rect
    let yScale = d3.scaleLinear()
      // plus 50 to keep column from touching top of svg
      .domain([0, maxValue + 50])
      .range([0,400]);

    let elements = this.matchSvg.selectAll("rect").data(this.filteredResults.sort((a :any, b: any) => a.round - b.round));

    //adds rect for selected team using data and y scale for the height 
    elements.enter()
      .append("rect")
      .attr("x",function(d : any,i : any){return (i*150) + 20;})
      .attr("y",function(d :any ){if(d.team1 == value){
        return 375 - yScale((((d.team1Goals * 3) +(d.team1Points ))*15))}
        else{return 375 - yScale((((d.team2Goals * 3) +(d.team2Points ))*15))}})
      .attr("width",40)
      .attr("height",function(d :any ){if(d.team1 == value){
        return yScale((((d.team1Goals * 3) +(d.team1Points))*15))}
        else{return yScale((((d.team2Goals * 3) +(d.team2Points))*15))}})
      .attr("fill","steelblue");
    
    //adds rect for opposite team using data and y scale for the height 
    elements.enter()
      .append("rect")
      .attr("x",function(d : any,i : any){return (i*150) + 60;})
      .attr("y",function(d :any ){if(d.team1 == value){
        return 375 - yScale((((d.team2Goals * 3) +(d.team2Points ))*15))}
        else{return 375 - yScale((((d.team1Goals * 3) +(d.team1Points ))*15))}})
      .attr("width",40)
      .attr("height",function(d :any ){if(d.team1 == value){
        return yScale((((d.team2Goals * 3) +(d.team2Points))*15))}
        else{return yScale((((d.team1Goals * 3) +(d.team1Points))*15))}})
      .attr("fill","red");

    elements.enter()
      .append("text")
      .attr("x",function(d: any, i: any){return (i*150) + 20})
      .attr("y",20)
      .text(function(d: any){return `Rd ${d.round} v ${d.team1 === value ? d.team2 : d.team1}`});
      
    elements.enter()
      .append("text")
      .attr("x",function(d: any, i: any){return (i*150) + 25})
      .attr("y",330)
      .text(function(d: any){return `(${d.team1 === value ? d.team1Score : d.team2Score})`})
      .attr("font-size",12);

    elements.enter()
      .append("text")
      .attr("x",function(d: any, i: any){return (i*150) + 65})
      .attr("y",330)
      .text(function(d: any){return `(${d.team1 === value ? d.team2Score : d.team1Score})`})
      .attr("font-size",12);
  }

  updateFormChart(value : string){

    d3.select("#formSVG").selectAll("circle").remove();
    d3.select("#formSVG").selectAll("#vs").remove();
    d3.select("#formSVG").selectAll("y.axis").remove();

    const yScale = d3.scaleLinear()
    .domain([0, 14])
    .range([360,0]);
    
    let elements = this.formSvg.selectAll("circle").data(this.filteredResults.sort((a :any, b: any) => a.round - b.round));

    elements.enter()
      .append("text")
      .attr("x",function(d: any, i: any){return (i*150) + 110})
      .attr("y",20)
      .attr("id","vs")
      .text(function(d: any){return `Rd ${d.round} v ${d.team1 === value ? d.team2 : d.team1}`})
      .style("fill","black")
      .attr("font-size",15);

    //y value for circles
    let y =0;
    
    elements.enter()
      .append("circle")
      .attr("cx", function (d: any, i:any) { return (i*150) + 60 } )
      .attr("cy", function (d: any) {
        // add 2 points for every round won, 1 if draw, 0 if lost
        if(d.team1 == value){
          if((d.team1Goals *3) + d.team1Points > (d.team2Goals *3) + d.team2Points){
            y+=2;
            return yScale(y);
          }else if((d.team1Goals *3) + d.team1Points == (d.team2Goals *3) + d.team2Points){
            y+=1;
            return yScale(y);
          }else{
            return yScale(y);
          }
        }else{
          if((d.team2Goals *3) + d.team2Points > (d.team1Goals *3) + d.team1Points){
            y+=2;
            return yScale(y);
          }else if((d.team1Goals *3) + d.team1Points == (d.team2Goals *3) + d.team2Points){
            y+=1;
            return yScale(y);
          }else{
            return yScale(y);
          }
        }})
      .attr("r", 10)
      .style("fill", function(d: any){
        if(d.team1 == value){
          if((d.team1Goals *3) + d.team1Points > (d.team2Goals *3) + d.team2Points){
            return "steelblue"
          }else if((d.team1Goals *3) + d.team1Points == (d.team2Goals *3) + d.team2Points){
            return "gold"
          }else{
            return "red"
          }
        }else{
          if((d.team2Goals *3) + d.team2Points > (d.team1Goals *3) + d.team1Points){
            return "steelblue"
          }else if((d.team1Goals *3) + d.team1Points == (d.team2Goals *3) + d.team2Points){
            return "gold"
          }else{
            return "red"
          }
        }});
  }

  onDropdownChange(event: Event){
    let value = (event.target as HTMLSelectElement).value;
    this.filteredResults = this.results.filter((result) =>{

      if(result.team1 == value || result.team2 == value){
        return result;
      }else{
        return;
      }
    });

    this.form = `${value} Form`;
    this.matchScores = `${value} Match Scores`
    this.updateMatchScoreChart(value);
    this.updateFormChart(value)
  }
}

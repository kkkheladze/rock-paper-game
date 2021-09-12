import { EventEmitter } from '@angular/core';
import {Component, OnInit, Output} from '@angular/core';
import {StateService} from "../shared/state.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.sass'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(200)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(400, style({opacity: 0})))
    ])
  ]
})
export class MovesComponent implements OnInit {
  score$!:number;
  selectedMove!:string;
  computerMove!:string;
  selected!:boolean;
  result!:string;
  resultModal!:boolean;

  constructor(private stateService:StateService) { }

  ngOnInit(): void {
    this.score$=this.stateService.score.getValue();
  }
  play(move:string){
    this.selectMove(move);
    this.computerMove=this.generateCMove();
    this.result=this.checkWinner();
    this.stateService.setScore(this.score$)
    this.resultModal=true;
  }
  selectMove(val:string){
    this.selected=true;
    this.selectedMove=val;
  }
  generateCMove():string{
    let move=Math.floor(Math.random() * (3) + 1);
    switch(move){
      case(1):
        return 'paper'
      case(2):
        return 'scissors'
      case(3):
        return 'rock'
      default:
        return 'paper'
    }
  }
  checkWinner(){
    if(this.selectedMove==='paper'){
      if(this.computerMove==='rock'){
        this.score$++;
        return "You Win!"
      }else if(this.computerMove==='scissors'){
        this.score$--;
        return "You Lose!"
      }else{
        return "It's a Draw!"
      }
    }
    if(this.selectedMove==='rock'){
      if(this.computerMove==='scissors'){
        this.score$++;
        return "You Win!"
      }else if(this.computerMove==='paper'){
        this.score$--;
        return "You Lose!"
      }else{
        return "It's a Draw!"
      }
    }
    if(this.selectedMove==='scissors'){
      if(this.computerMove==='paper'){
        this.score$++;
        return "You Win!"
      }else if(this.computerMove==='rock'){
        this.score$--;
        return "You Lose!"
      }else{
        return "It's a Draw!"
      }
    }
    return "Something Went Wrong!"
  }
  playAgain(){
    this.selected=false;
    this.result='Waiting For Your Move!'
  }
  resetScore(){
    this.score$=0;
    this.stateService.setScore(this.score$);
    this.playAgain();
  }
}

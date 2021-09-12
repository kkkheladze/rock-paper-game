import { EventEmitter } from '@angular/core';
import {Component, OnInit, Output} from '@angular/core';
import {StateService} from "../shared/state.service";

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.sass']
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
        return "Draw!"
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
        return "Draw!"
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
        return "Draw!"
      }
    }
    return "Something Went Wrong!"
  }
}

import {Component, Injectable, OnInit} from '@angular/core';
import {StateService} from "../shared/state.service";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.sass']
})
export class ScoreComponent implements OnInit {
  score:number=0;
  constructor(private stateService:StateService) { }

  ngOnInit(): void {
    this.stateService.score.subscribe(x=>{
      this.score=x
      }
    )
  }
}

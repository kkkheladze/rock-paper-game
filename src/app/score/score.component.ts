import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.sass']
})
export class ScoreComponent implements OnInit {
  score!:number;
  constructor() { }

  ngOnInit(): void {
    this.score=12
  }

}

import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  score$!:BehaviorSubject<number>;

  constructor() {
    this.score$=new BehaviorSubject(0)
  }
  setScore(val:number){
    this.score$.next(val)
  }
  get score(){
    return this.score$
  }
}

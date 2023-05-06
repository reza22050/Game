import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MathValidations } from '../_validations/math-validations';
import { Subscription, debounceTime, delay, filter, scan } from 'rxjs';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  sub: Subscription | undefined;
  public correct: number = 0;
  public correctPerSolution = 0;


  ngOnInit(): void {
    const startTime = new Date();
    this.sub = this.mathForm.statusChanges
    .pipe(
      // delay(250),
      debounceTime(500),
      filter((response)=>response === "VALID"),
      scan((acc)=>{
        return {
          numberSolved: this.correct++,
          startTime: acc.startTime
        };
      },
      {startTime: new Date()}
      )
    )
    .subscribe(({startTime})=>{
      //console.log(response);
      // if(response==="INVALID"){
      //   return;
      // }

      this.correct++;
      this.correctPerSolution = ((new Date()).getTime() - startTime.getTime()) / this.correct / 1000;

      this.mathForm.patchValue({
        a: this.randomNumber(),
        b: this.randomNumber(), 
        answer: ''
      });

    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  },
  [MathValidations.additional('answer', 'a', 'b')]
  );
 
  public get a() {
    return this.mathForm.get('a')?.value;
  }
  public get b() {
    return this.mathForm.get('b')?.value;
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  highlightValidation(numberOne: any, numberTwo: any, answer: any) {
    if((numberOne + numberTwo) * 0.8 < answer)
      return true;
    else
      return false;
  }
}

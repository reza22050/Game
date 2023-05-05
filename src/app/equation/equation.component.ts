import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent {

  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  });
 
  get a() {
    return this.mathForm.get('a')?.value;
  }
  public get b() {
    return this.mathForm.get('b')?.value;
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

}

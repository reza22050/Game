import { Directive, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription, map } from 'rxjs';

@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective implements OnInit{

  sub: Subscription | undefined;
  constructor(private elRef: ElementRef, private controlName: NgControl) { 
  }

  ngOnInit(): void {
    // console.log(this.elRef.nativeElement);
    //console.log(this.controlName);
    this.sub = this.controlName.control?.parent?.valueChanges
    .pipe(map(({a,b, answer})=>{
        return Math.abs((a+b-answer)/(a+b));
      }))
    .subscribe( val => {
      if(val < 0.2)
        this.elRef.nativeElement.classList.add('highlight');
      else
      this.elRef.nativeElement.classList.remove('highlight');

    })
  }


  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  

}

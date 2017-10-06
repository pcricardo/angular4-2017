import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() incrementNumber = new EventEmitter<any>();

  startedGame : boolean = false;
  interval;

  constructor() { }

  ngOnInit() {
  }

  onStart() {
    console.log("click onStart");
    this.startedGame = true;
    //this.incrementNumberTrigger();


    this.interval = setInterval(
      ()=>{this.incrementNumber.emit({});},
      1000);

  }

  onStop() {
    console.log("click onStop");
    this.startedGame = false;
    clearInterval(this.interval)
  }

  incrementNumberTrigger(){
    console.log("increment Number Trigger");
    this.incrementNumber.emit({});
  }
}

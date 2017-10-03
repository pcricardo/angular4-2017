import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  template: '<p>Sucess message.</p>',
  styles: [`
      p {
        padding: 10px;
        background-color: palegreen;
        border: 1px solid green;
      }`
    ]
})
export class SucessAlertComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

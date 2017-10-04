import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSecret = false;
  items = [];
  itemsText = [];


  onAddItem(){
    this.showSecret = ! this.showSecret;
    this.items.push(this.items.length + 1);
    this.itemsText.push(new Date());
  }
}

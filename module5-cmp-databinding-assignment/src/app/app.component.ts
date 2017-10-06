import{Component}from'@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  oddNumbers :number[] = [];
  evenNumbers :number[] = [];
  counter = 0;

  onIncrementNumber(){
    console.log("on Increment Number");
    this.counter ++;

    if(this.counter %2 === 0){
      this.evenNumbers.push(this.counter);
    }
    else {
      this.oddNumbers.push(this.counter);
    }
  }
}

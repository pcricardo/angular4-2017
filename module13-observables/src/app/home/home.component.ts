import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;
  

  constructor() { }

  ngOnInit() {
	//Simple observable
	const myNumbers = Observable.interval(1000);
	this.numbersObsSubscription = myNumbers.subscribe(
		(number: number) => {
			console.log(number);
		}
	);
	
	
	//Custom observable
	const myCustom = Observable.create((observer: Observer<string>) => {
		setTimeout(() => {
			observer.next('first package');
		}, 2000);
		setTimeout(() => {
			observer.next('second package');
		}, 4000);
		setTimeout(() => {
			//observer.error('error package');
			observer.complete();
		}, 5000);
		setTimeout(() => {
			observer.next('never pass package');
		}, 6000);	
	});
	this.customObsSubscription = myCustom.subscribe(
		(data: string) => { console.log(data); },
		(error: string) => { console.log(error); },
		() => { console.log('complete'); }
	);	
  }
  
  ngOnDestroy() {
	this.numbersObsSubscription.unsubscribe();
	this.customObsSubscription.unsubscribe();
  }

}

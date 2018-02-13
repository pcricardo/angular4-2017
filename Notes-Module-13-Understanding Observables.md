## Module 13 - Observables

### What is Observable

__Observable__
Various data sources:
- user innputs Events
- Http requests
- Triggered in code

__Observer - 3 ways of dealing data package__
1. Handle (Normal) Data
2. Handle Error
3. Handle Completion

__Used for:__
- asynchronous taks

__asynchronous taks__
- taks you do not know when append
- taks you do not know how long it takes

Observables are different aproach of callbacks or promises.

### Building and Using First Simple Observable
__Interval__ generate information every x miliseconds

Steps :
1. add imports
2. assign Observable to a var/const
3. subscribe (by calling the `subscribe` method)

Example:
```TS
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
(...)
ngOnInit() {
	const myNumbers = Observable.interval(1000);
	myNumbers.subscribe(
		(number: number) => {
			console.log(number);
		}
	);
}
(...)
```

### Building and Using Custom Observable from Scratch
Example - emit several data in different times

```TS
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
(...)
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
myCustom.subscribe(
	(data: string) => { console.log(data); },
	(error: string) => { console.log(error); },
	() => { console.log('complete'); }
);
(...)
```

Notes:
- after call `observer.complete();` no more data are emited
- the observer end when find `observer.error`or `observer.complete`

### Unsubscribe
The observables still exists after declare, even if we leave the page.
So it is __important__ to unsubscrive it.
The best place to unsubscrive is the method _ngOnDestroy_ of the component

Example:
```TS
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
(...)
numbersObsSubscription: Subscription;
customObsSubscription: Subscription;
(...)
ngOnInit() {
	this.numbersObsSubscription = myNumbers.subscribe(
		(number: number) => {
			console.log(number);
		}
	);
}
(...)
ngOnDestroy() {
	this.numbersObsSubscription.unsubscribe();
	this.customObsSubscription.unsubscribe();
}
(...)
```

### Where to learn more about Observables
http://reactivex.io/rxjs/
https://www.youtube.com/playlist?list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi

### Using Subjects to Pass Listen to Data
Steps:
1. create a service class, and declare a property of type: Subject
2. create a component that will emit data to the Subject, using `next('...')` method (for use the service in the component add it to the constructor)
3. create a component that will subscrive the Subject, using `subscribe` method (for use the service in the component add it to the constructor)

Notes:
- Subject is observable and observer at the same time
- use Subject to have observable and observer in one convenient object
- subject is like EventEmitter.
- prefer use Subject rather than EventEmitter to implement cross-component communication.

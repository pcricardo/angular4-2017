## Module 17 - Using Pipes to Transform Output
### Built in pipes
Examples:
- uppercase
- date

Oficial documentation: https://angular.io -> docs -> api -> search pipe

## Creating a Custom Pipe
steps:
- create new ts file
	- naming convetion: feacture + '.pipe.ts'
- create a class in file
	- the class should implements the interface PipeTransform
	- the class must have a method transform(value: any, args?: any): any
	- add decorator @Pipe to the class
- to use the pipe setup
	- app.module - add new pipe in declarations array
	
Example:

shorten.pipe.ts file
```TS
import {Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
	transform(value: any, limit: number) {
		if(value.length > limit) {
			return value.substr(0, limit) + ' ...';
		}
		return value;
	}
}
```
html file
```HTML
{{ server.name | shorten:15 }}
```

app.module.ts
```TS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    AppComponent,
	ShortenPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Pure and Impure Pipes (or: How to "fix" the Filter Pipe)
- By default angular __NOT__ rerun our pipe on the data when every an object (like array) is changed.
- Angular rerun our pipe when: we change an input, but not when the change an array.
- Pure equals false - angular run filter if any data is changed. This can be a performance issue, that is because by default pure is false.

## Notes
- Be aware to use pipes in filtering or sorting lists . See the page: https://angular.io/guide/pipes#no-filter-pipe

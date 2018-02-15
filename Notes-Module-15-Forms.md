## Module 15 - Forms

### Waht Angular ofers
Angular give us such a javascript object representation of the form.
This representation contais the form elements (like inputs) and adiciota information like form status (check if all the inouts are valid).

### Tamplate-Driven (TD) vs. Reactive-Approach
__Tamplate-Driven (TD)__ 
- angular infers the Form Object from the DOM

__Reactive__ 
- Form is created programmaticaly and cynchronized with the DOM
- More advanced approach


### TD: Creating the Form and Registering the Controls
Angular create a javascript object for us. This javascript object represents the infomation of the form.
Angular automatically detect the html tag `<form>` .
But angular __do not__ detect automatically the inputs in the form.

Steps:
- add import to _FormModule_ in the app.module.ts file
	- include _FormModule_ in the _imports_ array of __@NgModule__
- in html code 
	- add html tag `<form>`
	- in from register the controllers (tell angular each html elements will recognised by angular)
		- `ngModel` - add it inside html inputs
		- `name="name_control"`

### TD: Submitting and Using the Form
Steps:
- in ts code (component)
	- create a function that will be called in html code
- in html code
	- call the function
		- in html button tag of type = submit - __not the best approach__
			- because the default behavior of HTML is submit the form to the server
		- in html form tag - __best approach__
			- add `ngSubmit` directive
			
__Local reference:__
- `#f` 
	- it tells angular to give access to `HTMLFormElement` (by `ElementRef`). 
	- It is not a javascript object created by angular.
- `#f="ngForm"` 
	- it tells angular to give us access to the form created automatically by angular. 
	- It is a javascript object created by angular.
	- The type is `NgForm`

__NgForm__
- javascript object created by angular, with many properties
- value - key values pairs of form elements

__Example__

app.component.html file
```HTML
<form (ngSubmit)="onSubmit(f)" #f="ngForm">
	<label for="username">Username</label>
	<input 
		type="text" 
		id="username" 
		class="form-control"
		ngModel
		name="username">
	<button class="btn btn-primary" type="submit">Submit</button>
</form>
````

app.component.ts file
```TS
import { Component } from '@angular/core';
import { NgForm  } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  onSubmit(form: NgForm) {
	console.log(form);
  }
}
```

app.module.ts file
```TS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
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

### TD: Understanding Form State
__Properties:__
- controls - type FormControl
- dirty - is true if we change any value in the form 
- invalid - check validators
- touched - if we click in any form element 

### TD: Accessing the Form with @ViewChild
This is an alternative of using `<form (ngSubmit)="onSubmit(f)" #f="ngForm">`. 

The @ViewChild approach is useful if we need to access to the form not just at the moment when we submit the form, but earlier.

__Example__

app.component.html file
```HTML
<form (ngSubmit)="onSubmit()" #f="ngForm">
 ...
</form>
````

app.component.ts file
```TS
import { Component } from '@angular/core';
import { NgForm  } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  
  onSubmit() {
	console.log(this.signupForm);
  }
}
```

### TD: Adding Validation to check User Input

Validations Example:
- not empty - `required` - is a built-in HTML attibute, and the angular will deteted it and angular configure the form
- email - is not a built-in HTML attibute

### Built-in Validators & Using HTML5 Validation
https://angular.io/docs/ts/latest/api/forms/index/Validators-class.html -  built-in validators, 

https://angular.io/api?type=directive - directives, some can be used as validators (search for ones that have validator in the name)

To enable HTML5 validation (by default, Angular disables it). 
You can do so by adding the ngNativeValidate  to a control in your template.


### TD: Using the Form State
Disable submit button when form is not valid
```HTML
<button 
class="btn btn-primary" 
type="submit"
[disabled]="!f.valid"
>Submit</button>
```

Use CSS class to highlight the form filed that are invalid
```CSS
input.ng-invalid {
	border: 1px solid red;
}
```

### TD: Outputting Validation Error Messages

```HTML
<input 
type="email" 
id="email" 
class="form-control"
ngModel
name="email"
required
email
#email="ngModel">
<span *ngIf="!email.valid && email.touched">Please enter a valid email!</span>
```

__Note: we need to add a local reference to the input field to have access to the angular properties of the input.__

###

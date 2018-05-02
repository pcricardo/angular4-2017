## Module 15 - Forms

### What Angular offers
Angular give us such a javascript object representation of the form.
This representation contais the form elements (like inputs) and aditional information like form status (check if all the inouts are valid).

### Tamplate-Driven (TD) vs. Reactive-Approach
__Tamplate-Driven (TD)__ 
- angular infers the Form Object from the DOM

__Reactive__ 
- Form is created programmaticaly and synchronized with the DOM
- More advanced approach

### Tamplate-Driven (TD)
#### TD: Creating the Form and Registering the Controls
Angular create a javascript object for us. This javascript object represents the infomation of the form.
Angular automatically detect the html tag `<form>`.
But angular __do not__ detect automatically the inputs in the form.

Steps:
- add import to _FormModule_ in the app.module.ts file
	- include _FormModule_ in the _imports_ array of __@NgModule__
- in html code 
	- add html tag `<form>`
	- in from, register the controllers (tell angular each html elements will recognised by angular)
		- `ngModel` - add it inside html inputs
		- `name="name_control"`

Note __ngModel__:
- one way binding - just tell angular data input is a control
	- `ngModel`
- property binding - used to set default value to the control
	- `[ngModel]="defaultQuestion"`
- two way binding - used to instantly outputted, or use the value inputed
	- `[(ngModel)]="answer"`

#### TD: Submitting and Using the Form
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

#### TD: Understanding Form State
__Properties:__
- controls - type FormControl
- dirty - is true if we change any value in the form 
- invalid - check validators
- touched - if we click in any form element 

#### TD: Accessing the Form with @ViewChild
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
import { Component, ViewChild } from '@angular/core';
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

#### TD: Adding Validation to check User Input

Validations Example:
- not empty - `required` - is a built-in HTML attribute, and the angular will detect it and angular configure the form
- email - is not a built-in HTML attribute

#### Built-in Validators & Using HTML5 Validation
https://angular.io/docs/ts/latest/api/forms/index/Validators-class.html -  built-in validators, 

https://angular.io/api?type=directive - directives, some can be used as validators (search for ones that have validator in the name)

To enable HTML5 validation (by default, Angular disables it). 
You can do so by adding the ngNativeValidate  to a control in your template.


#### TD: Using the Form State
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
input.ng-invalid.ng-touched {
	border: 1px solid red;
}
```

#### TD: Outputting Validation Error Messages

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

__Note: we need to add a local reference (`#email="ngModel"`) to the input field to have access to the angular properties of the input.__

#### TD: Set Default Values with ngModel Property Binding
app.component.ts file
```JS
(...)
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion = 'pet';
  (...)
}
```

app.component.html file
```HTML
  <select 
	id="secret" 
	class="form-control"
	[ngModel]="defaultQuestion"
	name="secret">
	<option value="pet">Your first Pet?</option>
	<option value="teacher">Your first teacher?</option>
  </select>
```

#### TD: Using ngModel with Two-Way-Binding
app.component.ts file
```JS
(...)
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  (...)
}
```

app.component.html file
```HTML
	<div class="form-group">
	  <textarea 
		name="questionAnswer"
		rows="3"
		class="form-control"
		[(ngModel)]="answer"></textarea>
	</div>
	<p>Your replay: {{ answer }}</p>
```

#### TD: Grouping Form Controls
Senario: 
We have a form with many fields, it will be nice if we can group the fields in areas.

Example
```HTML
<form (ngSubmit)="onSubmit()" #f="ngForm">
	<div 
		id="user-data"
		ngModelGroup="userData"
		#userData="ngModelGroup"
		>
	  <div class="form-group">
		<label for="username">Username</label>
		<input 
			type="text" 
			id="username" 
			class="form-control"
			ngModel
			name="username"
			required>
	  </div>
	  <button class="btn btn-default" type="button">Suggest an Username</button>
	  <div class="form-group">
		<label for="email">Mail</label>
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
	  </div>
	</div>
	<p *ngIf="!userData.valid && userData.touched" style="color: red;">User Data is invalid!</p>
	(...)
</form>
```


Note: 
- with group, angular will validate and show validation messages per group.
- we can access to the group object using local reference like `#userData="..."` 

#### TD: Handling Radio Buttons
app.component.ts file
```JS
genders = ['male', 'female'];
```

app.component.html file
```HTML
<div class="radio" *ngFor="let gender of genders">
	<label>
		<input
			type="radio"
			name="gender"
			ngModel
			[value]="gender"
			required>
		{{ gender }}
	</label>
</div>
```

#### TD: Setting and Patching Form Values
__Set the values of all controls of the form__
```JS
suggestUserName() {
    const suggestedName = 'Superuser';
	this.signupForm.setValue({
		userData: {
			username: suggestedName,
			email: ''
		},
		secret: 'pet',
		questionAnswer: '',
		gender: 'male'
	});
}
```

Note: `setValue` function need to be passed a javascript object with __all fields__ of the form, and override all fields.

__Set a values of the controls you need to update__
```JS
suggestUserName() {
	const suggestedName = 'Superuser';
	this.signupForm.form.patchValue({
		userData: {
			username: suggestedName
		},
	});
}

```
Note: `patchValue` __only__ override the values specified in the function.

#### TD: Using Form Data
app.component.html file
```HTML
<div class="row" *ngIf="submitted">
	<div class="col-xs-12">
		<h3>Your Data</h3>
		<p>Username: {{ user.username }}</p>
		<p>Mail: {{ user.email }}</p>
		<p>Secret Question: {{ user.secretQuestion }}</p>
		<p>Answer: {{ user.answer }}</p>
		<p>Gender {{ user.gender }}</p>
		<p> </p>
	</div>
</div>
```

app.component.ts file
```JS
...
user = {
	username: '',
	email: '',
	secretQuestion: '',
	answer: '',
	gender: ''
};
submitted = false;

onSubmit() {
	//console.log(this.signupForm);
	this.submitted = true;
	this.user.username = this.signupForm.value.userData.username;
	this.user.email = this.signupForm.value.userData.email;
	this.user.secretQuestion = this.signupForm.value.secret;
	this.user.answer = this.signupForm.value.questionAnswer;
	this.user.gender = this.signupForm.value.gender;	
}
...
```

#### TD: Resetting Forms

__Just call `this.signupForm.reset()`.__

It reset all the values, and the css classes. 
It is like the page was loaded again.

Note: to reset the form to specific values use `setValue()' and pass the object with the values you would like to be showed.

### Reactive-Approach
#### Reactive: Setup
Notes:
- Angular offers some tolls to quickly create a form.
- At the end a form is a group of controls.
- need to import `ReactiveFormsModule` in the _imports_ array of __@NgModule__ in app.module.ts file 
	- there is no need `FormsModule`
- need to import `FormGroup` in the name.component.ts file 

#### Reactive: Creating a Form in Code
Notes:
- The init of FromGroup should the on OnInit method.
- FromGroup contains FormControl
- Controls are key values pars.

FormControl arguments:
- init value
- validator
- asynchronous validators

Example:
```JS
	ngOnInit() {
		this.signupForm = new FormGroup({
			'username': new FormControl(null),
			'email': new FormControl(null),
			'gender': new FormControl('male')
		});
	}
```

#### Reactive: Syncing HTML and Form
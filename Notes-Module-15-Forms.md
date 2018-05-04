## Module 15 - Forms

### What Angular offers
Angular give us such a javascript object representation of the form.
This representation contais the form elements (like inputs) and aditional information like form status (check if all the inouts are valid).

### Template-Driven (TD) vs. Reactive-Approach
__Template-Driven (TD)__ 
- angular infers the Form Object from the DOM

__Reactive__ 
- Form is created programmaticaly and synchronized with the DOM
- More advanced approach

### Template-Driven (TD)
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

Note:
- we difine the name of key with a string between quotes
- because we do not want, when javascript minifie, javascript change the key name 

#### Reactive: Syncing HTML and Form
Setup directives in HTML, to mapping HTML with our object (FormGroup) created in TS :
- formGroup - this tell angular to take our from group
- formControlName - tell angular what is the name of the inputs

app.component.html file
```HTML
<form [formGroup]="signupForm">
	<div class="form-group">
	  <label for="username">Username</label>
	  <input
		type="text"
		id="username"
		formControlName="username"
		class="form-control">
	</div>
</form>
```

Note:
- when setup the directives, the angular will not infer the default behavior (create a form), but it will use our form we create in TS.
- formControlName - can be define in 2 ways
	- `formControlName="username"`
	- `[formControlName]="'username'"`

#### Reactive: Submitting the form
It like Template-Driven:
- in ts code (component)
	- create a function that will be called in html code - `onSubmit()`
- in html code
	- call the function in html form tag - `(ngSubmit)="onSubmit()` 
- The diference with the Template-Driven approach is that in Reactive-Approach we do not need to get the form because the have create our own form in TS

__Example__

app.component.html file
```HTML
<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
	...
</form>
````

app.component.ts file
```TS
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  
  ngOnInit() {
	this.signupForm = new FormGroup({
		'username': new FormControl(null),
		'email': new FormControl(null),
		'gender': new FormControl('male')
	});
  }
  
  onSubmit(){
	console.log(this.signupForm);
  }
}
```

#### Reactive: Adding Validation
In Template-Driven, we can add for example, required property in HTML input.

But in Reactive we __can not use this approach__, because the form in created and setup in TS (not in HTML), and we only synchronize (using directives) the TS with HTML.

In Reactive, we need to use the second argument of the FormControl constructor.
It can be passed one validator or an array.


__Example__
app.component.ts file
```TS
ngOnInit() {
	this.signupForm = new FormGroup({
		'username': new FormControl(null, Validators.required),
		'email': new FormControl(null, [Validators.required, Validators.email]),
		'gender': new FormControl('male')
	});
}
```

Note 
- do not execute the validator `Validators.required()`, but instead, pass the reference `Validators.required` of validator. The angular will execute the validator when angular need it.
- Validators requred import `import { Validators } from '@angular/forms';` 

#### Reactive: Getting Access to Controls
To get access to the controls in HTML, use get method.
The get method receives one argument - control name or the path to the control

__Example__

app.component.html file
```HTML
<div class="form-group">
  <label for="username">Username</label>
  <input
	type="text"
	id="username"
	formControlName="username"
	class="form-control">
	<span *ngIf="!signupForm.get('username').valid && signupForm.get('username').touched" class="help-block">Please enter a valid username!</span>
</div>
```

Note:
- It is still possible get the controls using `signupForm.controls.username.valid`.
- But if we have nested form elements, is better to use get().
- For example:
	- `signupForm.get('userData.contactData.email').invalid` is better than 
	- `signupForm.controls.userData.controls.contactData.controls.email.invalid` 

#### Reactive: Grouping Controls
__Example__
app.component.ts file
```TS
  ngOnInit() {
	this.signupForm = new FormGroup({
		'userData': new FormGroup({
			'username': new FormControl(null, Validators.required),
			'email': new FormControl(null, [Validators.required, Validators.email])
		}),
		'gender': new FormControl('male')
	});
  }
```

app.component.html file
```HTML
<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
  <div formGroupName="userData">
	<div class="form-group">
	  <label for="username">Username</label>
	  <input
		type="text"
		id="username"
		formControlName="username"
		class="form-control">
		<span 
			*ngIf="!signupForm.get('userData.username').valid && signupForm.get('userData.username').touched" 
			class="help-block">Please enter a valid username!</span>
	</div>
	<div class="form-group">
	  <label for="email">email</label>
	  <input
		type="text"
		id="email"
		formControlName="email"
		class="form-control">
		<span 
			*ngIf="!signupForm.get('userData.email').valid && signupForm.get('userData.email').touched" 
			class="help-block">Please enter a valid email!</span>				
	</div>
</div>
<div class="radio" *ngFor="let gender of genders">
  <label>
	<input
	  type="radio"
	  formControlName="gender"
	  [value]="gender">{{ gender }}
  </label>
</div>
<button class="btn btn-primary" type="submit">Submit</button>
</form>
```
Note:
- it need to update get() method in HTML, by change the parameter value (from name of control, to path of control)
- the path is a string separated by dots.

#### Reactive: Arrays of Form Controls (FormArray)
Steps:
- add import
	`import { FormArray } from '@angular/forms';`
- add and initialize controller 
	- `'hobbies': new FormArray([])`
- decare and execute action to add control to array of controllers
	- `(<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null))`
	- when access with get() method, it need to cast to _FormArray_
- synchronize TS with HTML
	- by using `formArrayName` attribute in a HTML element, like a `<div>`
	
__Example__

app.component.html file
```HTML
<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
...
<div formArrayName="hobbies">
	<h4>Your Hobbies</h4>
	<button class="btn btn-default" type="button" (click)="onAddHobby()">Add Hobby</button>
	<div class="form-group"
		*ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index;">
	  <input
		type="text"
		class="form-control"
		[formControlName]="i">
	</div>
</div>
...
</form>
```

app.component.ts file
```TS
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
...
export class AppComponent implements OnInit {
	...
	signupForm: FormGroup;
  
	ngOnInit() {
		this.signupForm = new FormGroup({
			'userData': new FormGroup({
				'username': new FormControl(null, Validators.required),
				'email': new FormControl(null, [Validators.required, Validators.email])
			}),
			'gender': new FormControl('male'),
			'hobbies': new FormArray([])
		});
	}
	...
	onAddHobby() {
		const control = new FormControl(null, Validators.required);
		(<FormArray>this.signupForm.get('hobbies')).push(control);
	}
}
```

#### Reactive: Creating Custom Validators
validator:
- is just a function
- in parameter - control: FormControl
- return value - {[s: string]: boolean}

__Example__

app.component.ts file
```TS
...
ngOnInit() {
	this.signupForm = new FormGroup({
		'userData': new FormGroup({
			'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
			'email': new FormControl(null, [Validators.required, Validators.email])
		}),
		'gender': new FormControl('male'),
		'hobbies': new FormArray([])
	});
}
...
forbiddenNames(control: FormControl): {[s: string]: boolean} {
console.log(this.forbiddenUsernames.indexOf(control.value));
	if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
		return {'nameIsForbidden': true};
	}
	return null;
}
```

Note
- validator should return __null__ if is valid (or do not return nothing)
- error __this__, think about who is calling _this_. It is Angular, and not inside the class
	- to correct, just bind _this_
- remember, do not execute the validator 
- the error 'nameIsForbidden' can be viewed in: FormGroup > controls > control > errors

#### Reactive: Using Error Codes

__Example__
```HTML
<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
	 <div formGroupName="userData">
		<div class="form-group">
		  <label for="username">Username</label>
		  <input
			type="text"
			id="username"
			formControlName="username"
			class="form-control">
			<span 
				*ngIf="!signupForm.get('userData.username').valid && signupForm.get('userData.username').touched" 
				class="help-block">
				<span *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']">This name is invalid!</span>
				<span *ngIf="signupForm.get('userData.username').errors['required']">Please enter a valid username!</span>					
			</span>
		</div>
	</div>
	...
</form>
```

#### Reactive: Creating a Custom Async Validator
The typically scenario to async valitadion is to use a webservice to validate async operation.

validator:
- is just a function
- in parameter - control: FormControl
- return value - Promisse<any> | Obervable<any>

__Example__

app.component.ts file
```TS
...
ngOnInit() {
	this.signupForm = new FormGroup({
		'userData': new FormGroup({
			'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
		})
	});
}
  ...
forbiddenEmails(control: FormControl): Promise<any> | Obervable<any> {
	const promise = new Promise<any>((resolve, reject) => {
		setTimeout(() => {
			if(control.value === 'error@mail.com'){
				resolve({'emailIsForbidden': true});
			} else {
				resolve(null);
			}
		}, 1500);
	});

	return promise;
}
```

Note:
- Obervable need a import
	- `import { Observable } from 'rxjs/Observable';`
- note the status of html control, it change valid > pending > valid

#### Reactive: Reacting to Status or Value Changes
We can listening the changes in statusChanges and in valuesChanges

```TS
	this.signupForm.valueChanges.subscribe(
		(value) => console.log(value);
	);
	this.signupForm.statusChanges.subscribe(
		(status) => console.log(status);
	);	
```

#### Reactive: Setting and Patching Values
Setting patching, and reset are available, and it can be used in the same way Template-Driven.


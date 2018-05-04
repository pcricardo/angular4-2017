import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  
  ngOnInit() {
	this.signupForm = new FormGroup({
		'userData': new FormGroup({
			'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
			'email': new FormControl(null, [Validators.required, Validators.email], CustomValidators.forbiddenEmails)
		}),
		'gender': new FormControl('male'),
		'hobbies': new FormArray([])
	});
	
	//this.signupForm.valueChanges.subscribe(
	//	(value) => console.log(value);
	//);
	this.signupForm.statusChanges.subscribe(
		(status) => console.log(status);
	);	
  }
  
  onSubmit(){
	console.log(this.signupForm);
	console.log(this.signupForm.value);
  }
  
  onAddHobby() {
	const control = new FormControl(null, Validators.required);
	(<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
	if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
		return {'nameIsForbidden': true};
	}
	return false;
  }
  
//  forbiddenEmails(control: FormControl): Promise<any> | Obervable<any> {
//	const promise = new Promise<any>((resolve, reject) => {
//		setTimeout(() => {
//			if(control.value === 'error@mail.com'){
//				resolve({'emailIsForbidden': true});
//			} else {
//				resolve(null);
//			}
//		}, 1500);
//	});
//
//	return promise;
//  }
}

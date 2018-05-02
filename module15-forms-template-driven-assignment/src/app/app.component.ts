import { Component, ViewChild } from '@angular/core';
import { NgForm  } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	@ViewChild('f') signupForm: NgForm;
	subscriptions = ['Basic', 'Advanced', 'Pro'];
	defaultSubscription = 'Advanced';
	user = {
		email: '',
		password: '',
		subscription: ''
	};
	submitted = false;

	onSubmit() {
		console.log(this.signupForm);
		this.submitted = true;
		this.user.email = this.signupForm.value.email;
		this.user.password = this.signupForm.value.password;
		this.user.subscription = this.signupForm.value.subscription;	
	}  
}

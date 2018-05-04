import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

export class CustomValidators { 
	static forbiddenEmails(control: FormControl): Promise<any> | Obervable<any> {
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
}

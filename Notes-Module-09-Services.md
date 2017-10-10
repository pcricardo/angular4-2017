## Module 09 - Using Services & Dependency Injection

### Creating a Service
Steps:
- create ts file
	- name convention - service-name.service.ts
	- example: 'logging.service.ts'
- add a class
	- name convention - [service-name]Service
	- example: 'LoggingServic {}'

Example:
```ts
export class LoggingService {
  logStatusChange(status: string){
    console.log('A server status changed, new status: ' + status);
  }
}
```

Notes:
- A service is just a normal typescript calss
- Do not have decorator
- Angular is responsable for instantiate ours components.
- Angular will instantiate the service for us, using dependency injection

### Using a Service
Steps:
- add __import__ to the service that will use
- in __@Component__ decorator, add __providers__ property
- add parameter in the __constructor__
- then, just __call method__ of service

Example:
```TS
import { Component, EventEmitter, Output } from '@angular/core';

import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private logginService: LoggingService) {}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });

    this.logginService.logStatusChange(accountStatus);
    //console.log('A server status changed, new status: ' + accountStatus);
  }
}
```

### Understanding the Hierarchical Injector
- __App Module__ - same instance of service is available __Application-wide__
- __AppComponent__ - same instance of service is available for __all components__ (but __not for other services__)
- __Any other Component__ - same instance of service is available for __the Component and all its child components__

Notes:
- the angular framewoprk knows how to create an instance of that service for the component and __all__ its child components.
- the component and all child component will receive the __same instance__ of the service.
- the angular propagate down the components (child component, services), but __do not propagate up__

### How many Instances of Service Should It Be?
Example - 3 components where 1 is the top and the others 2 are child
- scenario 1 -  
	- 3 components and __each__ component use __providers__ property to use a service.	
	- in this senario, angular __create 3 instances__ of the service
- scenario 2 
	- 3 components __only__ the top componment uses __providers__ property to use a service (angular propagate the service for child components).
	- in this senario, angular __only create 1 instance__

### Injecting Services into Services
Steps:
- in app.module, add the service in the __providers property__ 
- remove the service from the components/services providers property
	- because adding the service in the app.module, the service will be available in the all application
- __add @Injectable() decorator__ in the service class that will receive the other service
	- add import Injectable from angular core
	- example error when the @Injectable is not added
		'Uncaught Error: Can't resolve all parameters for AccountService: (?).'
		
### Using Services for Cross-Component Communication
Steps:
- in the service - add new EventEmitter
	- `statusUpdated = new EventEmitter<string>();`
- in the component 1 - call the event from the service
	- `this.accountService.statusUpdated.emit(status);`
- in the component 2 - subscribe the event, and do something
	- `this.accountService.statusUpdated.subscribe( (status) => alert('New Status: ' + status) );`

### 
## Module 18 - Making Http Requests
### Angular 6 and Http

Angular 6 is currently the latest version of Angular and it deprecates the Http-access method taught in this module.

What does this mean?

It means that the method still works, still is secure - you can use it! But there is a better Http module to use now: HttpClient.

See module 23 - The HttpClient - to see the changes in Angular 6

### Firebase - Setup

Firebase is service provided by google as a  back end.

The feactures used in this module are availabel for free.

Setup Steps in Firebase
- create new project
- in project, go to database section -> rules
	- enable read and write
	- this will not require access to this database sample
- in section database -> data
	- there is available the url to be used in our Angular samples
	
Steps:
- create a new service
- add decorator @Injectable() to the class
- add Http to the constructor
	- add import Http from @angular/http
- use http methods
	- post, get, put, etc

Angular uses observables behind the scene.

Note: 
- @Injectable() is added because we are using other services (provided by angular) inside our service.
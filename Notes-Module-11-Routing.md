## Module 11 - Routing

### Setting up and Loading Routes
Steps:
- setup constant with list of path routes in the app.module.ts file
- register the routes in the app
	- in imports array @NgModule section add `RouterModule.forRoot(appRoutes)`
- in template, remove app component tags, a add new tag `<router-outlet>`

Example:
```TS
//app.module.ts 
(...)
import { Routes, RouterModule } from '@angular/router';
(...)
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'servers', component: ServersComponent }
];

@NgModule({
(...)
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
(...)
})
```

```HTML
<!--HTML File-->
<div class="row">
	<div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
		<router-outlet></router-outlet>
	</div>
</div>
````

Notes:
- in the 'path' do not add '/'
	- incorrect - path: __'/users'__
	- correct -  path: __'users'__

	
### Navigating with Router Links
**Option 1 (not the best)**
- Setup link with the URL
- This is not the correct way to navigate, and should not be used, because:
	- this will reload the page (and the application) every time we click in the link.
 
 Example:
 ```HTML
<ul class="nav nav-tabs">
	<li role="presentation" class="active"><a href="">Home</a></li>
	<li role="presentation"><a href="/servers">Servers</a></li>
	<li role="presentation"><a href="/users">Users</a></li>
</ul>
 ```
 
 **Option 2 (correct way)** 
 
 Use router link
 
 There are 2 ways:
 - routerLink='path'
 - [routerLink] = ['/path1', '/path2']
	- allow create complex path
 
Example:
```HTML
<ul class="nav nav-tabs">
	<li role="presentation" class="active"><a routerLink="">Home</a></li>
	<li role="presentation"><a routerLink="/servers">Servers</a></li>
	<li role="presentation"><a [routerLink]="['/users']">Users</a></li>
</ul>
```

Note:
- when using routes, in all links __should be removed the href="#"__, because the _'href="#"'_ will reload the page

### Understanding Navigation Paths
- absolute path 
	- `<a href="/servers">`
- relative path
	- `<a href="servers">`
	- `<a href="./servers">`
- go back from the currrent load page
	- `<a href="../servers">` - go back 1 level
	- `<a href="../../servers">` - go back 2 levels


### Styling Active Router Links
- Angular has the directive to setup the active link - `routerLinkActive`
- routerLinkActive will add a class (for example bootstrap class) to the HTML element if the link matches with the route
- By default angular wil seach if the url contains the path, so it is possible to have more than one link/menu active.
- To fix, there is another directive '[routerLinkActiveOptions]' that can fix it. 

Example
```HTML
<ul class="nav nav-tabs">
	<li role="presentation"
		routerLinkActive="active"
		[routerLinkActiveOptions]="{exact: true}">
		<a routerLink="/">Home</a>
	</li>
	<li role="presentation" routerLinkActive="active">
		<a routerLink="/servers">Servers</a>
	</li>
	<li role="presentation" routerLinkActive="active">
		<a [routerLink]="['/users']">Users</a>
	</li>
</ul>
```


### Navigating Programmatically
Steps:
- inject Route in the component
- use the code: `route.naveigate(['parth1', 'path2'])`

Example:
```TS
(...)
import { Router } from '@angular/router'
@Component({
(...)
})
export class HomeComponent {
	constructor(private router: Router) { }
	onLoadServers() {
		// do complex calculation
		this.router.navigate(['/servers']);
	}
}
```

The result is: __myAppUlr/servers__


### Using Relative Paths in Programmatic Navigation
Example:
```TS
...
import { Router, ActivatedRoute } from '@angular/router'
@Component({
...
})
export class ServerComponent implements OnInit {
	constructor(
	private router: Router,
	private route: ActivatedRoute) { }

	ngOnInit() {
	
	}
	onReload() {
		this.router.navigate(['servers'], {relativeTo: this.route});
	}
```

The result is: __myAppUlr/servers/servers__
	- if the actual route is 'servers'

Notes:
- The navitagor method does not know the current route we are.
- To know it is necessary add `{relativeTo: this.route}`


### Route Parameters
**Passing Parameters to Routes**
```TS
const appRoutes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'users/:id', component: UserComponent },
]
```

Where '__:id__' is a parameter name

**Fetching Route Parameters**

The ActivatedRoute object that we inject will give us access to the id passed in the URL => Selected User

```TS
//URL demo: localhost:4200/users/1/Max
...
import { ActivatedRoute } from '@angular/router'
@Component({
...
})
export class UserComponent implements OnInit {
	user: {id: number, name: string};

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.user = {
			id: this.route.snapshot.params['id'],
			name: this.route.snapshot.params['name']
		};
	}
}
```

Note:
- route.snapshot only works if we access to the component outside the component. Because route.snapshot only runs/update at the time the component is created, not when reloaded
	- for example, if we are in home (/home) page and access to user details (/users/1/Max) it works
- if we access to the component inside the component this __not works__ (although the url is updated)
	- For example using a link that go to the same componentent

	
**Fetching Route Parameters Reactively**

Use this aproach if your application reload the page/component with diferent data.

```TS
...
import { ActivatedRoute, Params } from '@angular/router'
@Component({
...
})
export class UserComponent implements OnInit {
	user: {id: number, name: string};

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.user = {
			id: this.route.snapshot.params['id'],
			name: this.route.snapshot.params['name']
		};
		this.route.params
			.subscribe(
				(params: Params) => {
					this.user.id = params['id'];
					this.user.name = params['name'];
				}
			);
	}
}
``` 

Note
- route.params is an observable
- observable is not part of Angular, is from rxjs package (`import { Observable } from 'rxjs/Observable';`)
- angular will destroy the subscription for us when the component is destroyed. So we do not nedd destroy the subscription.


### Passing and Retrieving Query Parameters and Fragments


How to pass and retrive information from ULR like: 'localhost:4200/users/2/edit?allowEdit=1#loading'

Example - HTLM:
```HTML
<a
	[routerLink]="['/servers', 5, 'edit']"
	[queyParams]="{allowEdit: '1'}"
	fragment="loading"
	href="#"
	class="list-group-item"
	*ngFor="let server of servers">
	{{ server.name }}
</a>
```

Example - programmatic
```TS
(...)
import { Router } from '@angular/router'
(...)
@Component({
(...)
})
export class HomeComponent implements OnInit {
	constructor(private router: Router) { }
	
	ngOnInit() { }
	
	onLoadServer(id: number) {
		//navigate with parameters
		this.router.navigate(
			['/servers', id, 'edit'], 
			{queryParams: {allowEdit: '1'}, fragment: 'loading'}
			);
}
```

Note:
- [queryParams] is not a new angular directive, is a bindding property of routerLink directive


### Setting up Child (Nested) Routes
steps:
- in the constant with list of path routes (app.module.ts)
	- __add parameter__ 'children' to the main route
	- the 'children' contains the children routes (with a __relative path__ to the main component)
- in template of the main component, remove app component tags, a add new tag `<router-outlet>`

Example before child Routes
```TS
const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'users', component: UsersComponent },
	{ path: 'users/:id/:name', component: UserComponent },
	{ path: 'servers', component: ServersComponent },
	{ path: 'servers/:id', component: ServerComponent },
	{ path: 'servers/:id/edit', component: EditServerComponent },
];
```

Example after child Routes
```TS
const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'users', component: UsersComponent, children: [
		{ path: ':id/:name', component: UserComponent }
	] },
	{ path: 'servers', component: ServersComponent, children: [
		{ path: ':id', component: ServerComponent },
		{ path: ':id/edit', component: EditServerComponent }
	] }
];
```


### Configuring the Handling of Query Parameters
Preserves the query parameters for the next navigation.

queryParamsHandling:
- merge
- preserve

Exmaple:
```TS
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
```
Note:
- queryParamsHandling VS preserveQueryParams - preserveQueryParams is deprecated


### Redirecting and Wildcard Routes
**Redirecting to Not Found Page**

Steps:
- create a compoents that will represents the _not found page_
- in the constant with list of path routes (app.module.ts)
	- add route for the new component
	- add new _special route_

Example:
```TS
const appRoutes: Routes = [
	...
	{ path: 'not-found', component: PageNotFoundComponent },
	{ path: '**', redirectTo: '/not-found' }
];
```
Notes '**'
- wildcard that means catch all path 
- have to be the last route in the array

**Create NgModule for Routes**
- It is good practice keep the files small.
- It is standart to extract the routes from the app.module to a new module

Example - app routing module:

```TS
//file name: app.module.ts
...

@NgModule({
	declarations: [
	(...)
	],
	imports: [
		(...)
		AppRoutingModule
	],
	(...)
})
export class AppModule { }

```

```TS
//file name: app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

(...)

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'users', component: UsersComponent, children: [
		{ path: ':id/:name', component: UserComponent }
	] },
		{ path: 'servers', component: ServersComponent, children: [
		{ path: ':id', component: ServerComponent },
		{ path: ':id/edit', component: EditServerComponent }
	] },
	{ path: 'not-found', component: PageNotFoundComponent },
	{ path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
```

### An Introduction to Guards

Angular allow running some code before a component is loaded.


### Protecting Routes with canActivate
Main Steps:
- create a auth service, that check if user is authorised
	- this service should have a method that return a __Promise__
- create a auth guard service
	- this service should implements the (angular) __CanActivate__ interface
	- this service uses the service (auth sevice) created in the previous step
	- the CanActivate interface
		- define the method `canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {...}`
- setup the routes with __canActivate__ property
	- if it used in a route, it also afect the children routes
- add the 2 services to providers property of NgModule, of AppModule

Example - fake Auth Service
```TS
export class AuthService {
	loggedIn = false;

	isAuhenticated() {
		const promise = new Promise(
			(resolve, reject) => {
				setTimeout( () => {
					resolve(this.loggedIn);
					console.log('isAuhenticated = ' + this.loggedIn);
				}, 800);
			}
		);
		return promise;
	}
	
	login() {
		this.loggedIn = true;
	}

	logout() {
		this.loggedIn = false;
	}
}  
```

Example - Auth Guard Service
```TS
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService }  from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		
		return this.authService.isAuhenticated()
			.then(
				(authenticated: boolean) => {
					if (authenticated) {
						return true;
					} else {
						this.router.navigate(['/']);
					}
				}
			);
	}
}
```

Example - Route
```TS
  { path: 'servers', canActivate:[AuthGuard], component: ServersComponent, children: [
    { path: ':id', component: ServerComponent },
    { path: ':id/edit', component: EditServerComponent }
  ] },
 ```
 
 Note Guard
 - A guard must be a service.
 - We can create diferent guards
	- auth
	- can leave page
	- etc


### Protecting Child (Nested) Routes with canActivateChild
Steps:
- in Auth Guard Service
	- implements the __CanActivateChild__ interface
	- in the new method __canActivateChild()__ just call the _canActivate()_ method
- int the setup the routes
	- replace `canActivate:[AuthGuard]` with `canActivateChild:[AuthGuard]`


### Controlling Navigation with canDeactivate
Scenario: 
- The user is in a form, and accidentally leave the page by click in a menu/link, back, etc
- If this happen we want of ask the user if he really want to leave the page

Steps:
- create a guard __service__
	- __create__ an __interface__ and a class
- in the component that we want to guard
	- make the component __implements the interface created__ in the previous steps
		- implements the method defined in the interface
- setup the routes with __canDeactivate__ property
- add the new service to providers property of NgModule

Example - Guard Service
```TS
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
	canDeactivateComponent: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

	canDeactivate(component: CanComponentDeactivate,
			currentRoute: ActivatedRouteSnapshot,
			currentState: RouterStateSnapshot,
			nextState?: RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean {
		return component.canDeactivateComponent();
	}
}
```

Example - changes in component
```TS
(...)
@Component({
(...)
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
	
	constructor(private serversService: ServersService,
		private route: ActivatedRoute,
		private router: Router) { }

	canDeactivateComponent(): Observable<boolean> | Promise<boolean> | boolean {
		//add logic
		//return a boolean
	}
```

Example - Route
```TS
	{ path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
 ```
	
Notes:
- the CanDeactivateGuard -> canDeactivate() is called by angular


### Passing Static Data to a Route

Steps:
- in the route add a property 'data', the property receive an object
- in the component atatch with the route, access to static data passed in the route

Example - Route
```TS
{ path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!!!'} }
```

Example - Component
```TS
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
(...)
})
export class ErrorPageComponent implements OnInit {
	errorMessage: string;
	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.errorMessage = this.route.snapshot.data['message'];
		this.route.data.subscribe(
			(data: Data) => {
			this.errorMessage = data['message'];
			}
		);
	}
}
```

Notes:
- the __Data__ need the import: `import { Data } from '@angular/router'`


### Resolving Dynamic Data with the resolve Guard
Scenario: 
- we have a list of servers
- when we select one server (from the list) we want to get the details using asynchronized 
- the data will be fetch before the route can is displayed/rendered

Steps:
- create a __resolver__ that will get the information before the route is rendered.
	- the resolver is a service that implements the (angular) __interface Resolve<?>__ (from @angular/route)
	- implements the __resolve()__ method
- setup the routes with __resolver__ property
	- the resolver property receive a  java script object
	- it contains key/values pares
		- key: name we define
		- value: the service class created in the previous step
- add the new service to providers property of NgModule

Example - service
```TS
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {

	constructor(private serversService: ServersService) {}

	resolve(route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot) : Observable<Server> | Promise<Server> | Server {
		const id = +route.params['id'];
		return this.serversService.getServer(id);
	}
}
```

Example - Component
```TS
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router'

@Component({
(...)
})
export class ServerComponent implements OnInit {
	server: {id: number, name: string, status: string};
	
    constructor(
              private route: ActivatedRoute,
              private router: Router) { }
			  
	ngOnInit() {
		//use resolver (that uses ServersService) to get data asynchronized
		this.route.data.subscribe(
			(data: Data) => {
			this.server = data['server'];
			}
		);
```

Example - Route
```TS
{ path: ':id', component: ServerComponent, resolve: {server: ServerResolver} }
```
	
Notes:
- resolver is used for asynchronized tasks
- the resolver will load the data in advance
- unlike the compoent the service will executed each time, so it is not nedd to use subscrive in our ServerResolver
- the link between the component and the route is:
	- route: resolve: {__server__: ServerResolver}
	- compoent: data[__'server'__]


### Understanding Location Strategies
- The servers that hosting the applications need to be configured to deal with 404 error.
- It is normal the servers return Index.html file for 404 error.
- Why? Because all the url are parsed by the server first (not by angular). This is a behavior of servers, not a bug of angular.
- There are some approaches to dial with this, one of that is using the hash (#)

**Enable Hash in angular**
- in the setup routes add __{useHash: true}__
- by default the value is false
- the result of url are:
	- using default value: _'localhost:4200/users'_
	- using useHash = true: _'localhost:4200/#/users'_

Example:
```TS
@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, {useHash: true})
	],
	exports: [RouterModule]
})
```

Notes:
- all parts in the right of # are ignored by web servers.
 

### Sumary

**Links**
- When using routes, the links (HTML <a>) should not have 'href="#"'
- Because 'href="#"' cause the reload of tha page
- But if we remove 'href="#"', the mouse cursor not change to hand cursor
	- to add the hand cursor, add __style="cursor: pointer;"__

**Routes Problems**
The next rout has a problem in the route 'new', because angular does not know if 'new' is a parameter in 'id'
```TS
{ path: 'recipes', component: RecipesComponent,
	children: [
		{ path: '', component: RecipeStartComponent },
		{ path: ':id', component: RecipeDetailComponent },
		{ path: 'new', component: RecipeEditComponent },
		{ path: ':id/edit', component: RecipeEditComponent }
	]
}
```
Solution: put the route 'new' before the route ':id'


**Get information from route**
```TS
import { ActivatedRoute } from '@angular/router'
route: ActivatedRoute
this.route.snapshot.params[...]
```

**Navigate**
```TS
import { Router, ActivatedRoute } from '@angular/router'
router: Router
this.router.navigate(['/home']);
```

**Navigate Relative**
```TS
import { Router } from '@angular/router'
router: Router
route: ActivatedRoute
this.router.navigate(['about'], {relativeTo: this.route});
```
The result is: myAppUlr/home/about - if the actual route is 'home'


**ActivatedRoute Vs ActivatedRouteSnapshot**
- ActivatedRoute gives you access to both the snapshot and the observables whilst 
- ActivatedRouteSnapshot will only give you access to the snapshot data.

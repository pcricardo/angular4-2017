## Module 02 - The Basics

### Components

Components contains it owns:
- template - html
- bisuness logic - typescript
- style - css

**AppCompent**
- AppCompent is a special component.
- It is created by CLI
- It is the root component

### Creating a component manually

**Main Steps:**
- create files:
	- create sub-folder to contain files for new componente
	- create the template file (.html)
	- create business logic file (.ts)
	- create the style file (.css). If needed.
- register component in the app (change the app.module.ts)
- using the component in the html

**create sub-folder**
- create the sub-folder in 'app' folder
- the name should be the name of the module

**create business logic file (typescript file)**
- the name should be the name of the module. Example server.component.ts
- in the file:
	- create class. Example name class 'ServerComponent'
	- add @Component decorator to  class
		- selector - optional
		- templateUrl or  template	- __required__
			- templateUrl - put html in external file
			- template - use html in-line template, useful if the html is only a fiew files
		- styleUrls or styles __optional__
			- styleUrls - array of external css files
			- styles - in-line styles, array of strings

**register component in the app**
- change app.module.ts
	- add import to new component
	- in @NgModule decorator add the module to declarations array
	
**using the component in the html**
- in app.component.html, just add html tag with the name of selector. Example: <app-server></app-server>

### Creating Components with the CLI & Nesting Components
- With 'ng serve' runnig
- And in the command line, in hte folder project
- Run the command: 
	- `ng generate component [path + name component]`
	- or `ng generate component [path + name component] --spec false`, __--spec false__ will not create test file
	- where 'path' 
		- is optional, but usefull when want to create a srtucture folders
		- example recipes/recipe-list

Result:
- create a folder with the files
	- html - template
	- ts - typescript
	- css - style
	- spec.ts - tests
- register component in the app, by adding dependencies in file app.module.ts

**using the component in the html**
- in app.component.html, just add html tag with the name of selector. Example: <name component></name component>

### Component Selector

It is possible change the way Angular use the selector. It is like css.
- default - select by element
	- component: `selector: 'app-servers'`
	- html: `<app-servers></app-servers>`
- by attiblute
	- component: `selector: '[app-servers]'`
	- html: `<div app-servers></div>`
- by class
	- component: `selector: '.app-servers'`
	- html: `<div class="app-servers"></div>`
	
Note: is not possivle select by id

----

### Databinding

**Understand Databinding**
- Databinding is the comunication between TypeScript Code (Business Logic) and Template (HTML)
- Types:
	- Output Data
		- String interpolation - {{data}}
		- Property binding - [property] = "data"
	- Reactor to (User) Events
		- Event binding - (event) = "expression"
	- Two-Way-Binding - [(ngModel) = "data"]
	
Note: Two-Way-Binding
- For Two-Way-Binding to work, you need to enable the ngModel  directive. This is done by adding the FormsModule  to the imports[]  array in the AppModule.
- You then also need to add the import from @angular/forms  in the app.module.ts file:
- `import { FormsModule } from '@angular/forms';`

Notes: How do you know to which Properties or Events of HTML Elements you may bind? 
- You can basically bind to all Properties and Events - a good idea is to console.log()  the element you're interested in to see which properties and events it offers.

### Directives

**What are directives?**

Directives are instructions in the DOM.

**Types of directives**
- Structural
	- add/remove elements in the DOM
	- Example: ngIf, ngFor
- Attribute
	- change the elements in the DOM
	- DO NOT add/remove elements in the DOM
	- Example: ngStyle, ngClass

**Built-in directives**
- ngIf
	- Example: `<p *ngIf="serverCreated">Server was created. Name is {{ serverName }}</p>`
	- where `serverCreated` is a property.
- ngStyle - allow dinamically change the style of a HTML element
	- Example: `<p [ngStyle]="{backgroundColor:getColor()}">put text here</p>`
	- where `getColor()` is a method
	- another example: `[ngStyle]="{backgroundColor: (odd % 2 !==0) ? 'yellow' : 'transparent'}"`
	- where 'odd' is a property in the ts file
- ngClass - allow dinamically add/remove css classes
	- Example: `<p [ngClass]="{onlineClass: serverStatus === 'online' }">put text here</p>`
	- key + value
		- key - class to add
		- value - condition to add a class
- ngFor
	- Example: `<app-server *ngFor="let serve of servers"></app-server>`
	- where 'servers' is the array, and 'let serve' is the local variable


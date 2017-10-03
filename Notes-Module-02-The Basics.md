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
- And in hte command line, in hte folder project
- Run the command: `gn generate component [name component]`

Result:
- create a folder with the files
	- html - template
	- ts - typescript
	- css - style
	- spec.ts - tests
- register component in the app, by adding dependencies in file app.module.ts

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

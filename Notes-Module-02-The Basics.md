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
		- add selector, templateUrl, and styleUrls (if necessary)

**register component in the app**
- change app.module.ts
	- add import to new component
	- in @NgModule decorator add the module to declarations array
	
**using the component in the html**
- in app.component.html, just add html tag with the name of selector. Example: <app-server></app-server>

### Creating Components with the CLI & Nesting Components

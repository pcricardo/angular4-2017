## Module 05 - Components & Databinding Deep Dive

### Bidding Custom Properties

Usecase: Pass information between master component to detail component.

**Steps:**
- in the datail component (ts file)
	- declare a property with the decorator @Input, and add the import.
	- example: `@Input() element: {type:string, name:string, content:string};`
- in the master component
	- html file	
		- add a property
		- example: `<app-server-element *ngFor="let serveElement of serverElements"  [element]="serveElement" ></app-server-element>`
		- where the property name __[element]__ must be equal to __@Input() element__
	- ts file `serverElements = [{type:'server', name:'TestServer', content:'Just a test!'}];`
	
Note @Input()
- by default all properties of components are only accessed inside the component, __not__ from outside.
- we have to be explicited to each properties will be accessed outside the component, by decorate the properties with __@Input__
- @Input() need to be imported - `import { Input } from '@angular/core';`
Notes TypeScript:
- declare an object in : `element: {type:string, name:string, content:string};`
- instantiate an array of objects: `serverElements = [{type:'server', name:'TestServer', content:'Just a test!'}];`

### Assigning an Alias to Custom Properties
- in the datail component (ts file)
	- declare a property with the decorator @Input, and add the import.
	- example: `@Input('srvElement') element: {type:string, name:string, content:string};`
- in the master component
	- html file	
		- example: `<app-server-element *ngFor="let serveElement of serverElements"  [srvElement]="serveElement" ></app-server-element>`
		- where the property name __[srvElement]__ must be equal to alias __@Input('srvElement')__

### Binding to Custom Events

Usecase: Pass information between detail component to master component.

**Steps:**
- in the datail component (ts file)
	- imports: @Output, @EventEmitter
	- declare a property with the decorator @Output
	- example: `@Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();`
	- in the logic of the module add value to the property 'serverCreated'
		- example: 
		```
		  onAddServer() {
			this.serverCreated.emit({
			  serverName: this.newServerName,
			  serverContent: this.newServerContent
			});

		  }
		```
- in the master component
	- ts file - setup an event function
		- example: 
		```
		  serverElements = [{type:'server', name:'TestServer', content:'Just a test!'}];
		  
		  onServerAdded(serverData: {serverName: string, serverContent: string}) {
			this.serverElements.push({
			  type: 'server',
			  name: serverData.serverName,
			  content: serverData.serverContent
			});
		  }
		```
	- html file	
		- maping the event __onServerAdded__ and the property __serverCreated__
		- example: `<app-cockpit  (serverCreated)="onServerAdded($event)"></app-cockpit>`
	

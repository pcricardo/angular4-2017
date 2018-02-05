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
	
### View Encapsulation
**Options:**
- Emulated (default)
- None
- Native - uses Shadow DOM technology
	- not all browsers suport used Shadow DOM

**How to change**
- in the module html file
- add 'encapsulation' property to the decorator @Components
- example:`@Component({ ... encapsulation: viewEncapsulation.none})`

### Using Local References in Templates

This is used when we do not what use two way data binding

Example:
```HTML
	<input 
	  type="text" 
	  class="form-control"
	  #serverNameInput>
	<button
	  class="btn btn-primary"
	  (click)="onAddServer(serverNameInput)">Add Server</button>
```
```js
	onAddServer(nameInput: HTMLInputElement) {
		console.log(nameInput);
		this.serverCreated.emit({
		  serverName: nameInput.value,
		  serverContent: this.newServerContent
		});
	}
```
Note hash tag element:
- the local reference will hold a refecence to the element (HTML element), not to the value
- only can be used in the HTML template, __not inside typescript code__. So to access to these values it is need to pass in a method

### Getting Access to the Template & DOM with @ViewChild

This is used to get direct access to elements in DOM in template through view child.

Example:
```HTML
    <input
      type="text"
      class="form-control"
      #serverContentInput>
```
```js
	import { (...), ViewChild, ElementRef} from '@angular/core';
	(...)
	@ViewChild('serverContentInput') serverContentInput: ElementRef;
	(...)
	onAddServer(nameInput: HTMLInputElement) {
		console.log(nameInput);
		console.log(this.serverContentInput);
		this.serverCreated.emit({
		  serverName: nameInput.value,
		  serverContent: this.serverContentInput.nativeElement.value
		});
	}
```

Note:
- use this way to only access to the element value, 
- __should not__ be used to change the DOM element
- to change the DOM element, uses string interpolation and property binding

### Projecting Content into Components with ng-content

This way is used to project the html content from the master component to the detail component.

This is used when the html content is complex.

Example before:
```HTML
<!-- master component-->
<div class="row">
    <div class="col-xs-12">
      <app-server-element
        *ngFor="let serveElement of serverElements"
        [srvElement]="serveElement"
      ></app-server-element>
    </div>
</div>
  
<!-- detail component-->
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <p>
      <strong *ngIf="element.type === 'server'" style="color: red">{{ element.content }}</strong>
      <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
    </p>
  </div>
</div>
```
Example after:
```HTML
<!-- master component-->
<div class="row">
    <div class="col-xs-12">
      <app-server-element
        *ngFor="let serveElement of serverElements"
        [srvElement]="serveElement">
        <p>
          <strong *ngIf="serveElement.type === 'server'" style="color: red">{{ serveElement.content }}</strong>
          <em *ngIf="serveElement.type === 'blueprint'">{{ serveElement.content }}</em>
        </p>
      </app-server-element>
    </div>
</div>
  
<!-- detail component-->
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <ng-content></ng-content>
  </div>
</div>
````

### Understanding the Component Lifecycle

| Event | Description |
| --- | --- |
| gnOnChanges | called after a bound input property changes |
| ngOnInit | Called once the component is initialized , called after execut constructor|
| ngDoCheck | Called during every change detection run |
| ngAfterContnentInit | Called after content (ng-content) has been projected into view |
| ngAfterContentChecked | Called every time the projected content has benn checked |
| ngAfertViewInit | Called after the component's view (and child views) has benn initialized |
| ngAfterViewChecked | Called every time the view (and child views) has benn checked |
| ngOnDestroy | Called once the component is about to be destroyed |

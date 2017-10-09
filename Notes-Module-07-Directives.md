## Module 07 - Directives

### Creating a Basic Attribute Directive
Steps:
- create ts file
	- manually
		- name convention - directive-name.directive.ts
		- example: 'basic-highlight.directive.ts'
	- automativally with command 'ng generate directive [path + name component]'
- in ths TS file
	- create a class (example: BasicHighLightDirective)
	- add @Directive decorator to class
	- setup decorator
		- selector - example: `selector: '[appBasicHighLight]'`
- add imports in the module that will uses the directive
- add directive to the tamplate html element
	- example: `<p appBasicHighLight>Style me with basic directive!</p>`

Example:
```ts
import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBasicHighLight]'
})
export class BasicHighLightDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
```

Notes:
- Directive do not have a view/template
- The selector uses brackets []
- This is not good practive to chage DOM using 'this.elementRef.nativeElement.style.backgroundColor = 'green';'
- The better way is use Rederer2.

### Using the Renderer to build a Better Attribute Directive
**Using Renderer 2 in the last example**
Example:
```ts
import { Directive, OnInit, ElementRef, Renderer2,  RendererStyleFlags2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighLight]'
})
export class BetterHighLightDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue', RendererStyleFlags2.Important);
  }

}
````

### Using HostListener to Listen to Host Events
Steps:
- Add decorator `@HostListener`to some method
	- add import HostListener from angular/core
- in the decorator specify the event name
	- example: mouseenter, mouseleave
- in the method is possivel pass the event data (Event) as a parameter

Example:
```ts
import { Directive, OnInit, ElementRef, Renderer2,  HostListene } from '@angular/core';
@Directive({
  selector: '[appBetterHighLight]'
})
export class BetterHighLightDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  }
}

```

### Using HostBinding to Bind to Host Properties
Example:
```ts
import { Directive, OnInit, ElementRef, Renderer2,  HostListener, HostBinding } from '@angular/core';
@Directive({
  selector: '[appBetterHighLight]'
})
export class BetterHighLightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = 'blue';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = 'transparent';
  }
}

```

### Binding to Directive Properties
Example:
```ts
import { Directive, OnInit, ElementRef, Renderer2,  HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighLight]'
})
export class BetterHighLightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}
```

```HTML
<p appBetterHighLight [defaultColor]="'yellow'" [highlightColor]="'red'">Style me with better directive!</p>
```

**Alias @Input with selector**
```ts
@Directive({
  selector: '[appBetterHighLight]'
})
export class BetterHighLightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighLight') highlightColor: string = 'blue';
(...)
```
```HTML
<p [appBetterHighLight]="'red'" [defaultColor]="'yellow'">Style me with better directive!</p>
```

*Note*
- in HTML the directive has like a property bidding with brackets "[]"
- in @Input we give the name of the directive
- By using this "trick", you can quickly add the directive and pass a value to the property which it needs to work correctly.


**Shortcut Directive Properties**
```HTML
<p [appBetterHighLight]="'red'" defaultColor="yellow">Style me with better directive!</p>
```

*Notes:*
- 'defaultColor' stills a property bidding even without brackets "[]"
- It is a more common approach to use [] around non-standard DOM properties

### Building a Structural Directive
Example:
```ts
import { Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    console.log("AQUI");
    if(condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
      console.log("ADD");
    } else {
      this.vcRef.clear();
      console.log("REMOVE");
    }
  }
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }
}
```

``` HTML
<div *appUnless="!onlyOdd">
  <li
	class="list-group-item"
	[ngClass]="{odd: even % 2 !==0}"
	[ngStyle]="{backgroundColor: (even % 2 !==0) ? 'yellow' : 'transparent'}"
	*ngFor="let even of evenNumbers"
  >{{ even }}
  </li>
</div>
```

*Note:*
- the selector and the @Input property must have the same name

### Understanding ngSwitch
Example:
```TS
value = 10;
```
```HTML
<div [ngSwitch]="value">
	<p *ngSwitchCase="5">Value is 5</p>
	<p *ngSwitchCase="10">Value is 10</p>
	<p *ngSwitchCase="100">Value is 100</p>
	<p *ngSwitchDefault>Value is default</p>
</div>
```

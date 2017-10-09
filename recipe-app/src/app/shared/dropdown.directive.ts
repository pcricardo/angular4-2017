import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toogleOpen() {
    this.isOpen = ! this.isOpen;
  }

  /*
  show: boolean = false;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  @HostListener('click') toogleOpen(eventData: Event) {
    this.show = ! this.show
    console.log('on click ' + this.show + ' ' + eventData);
    if(this.show) {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    }
  }
  */

}

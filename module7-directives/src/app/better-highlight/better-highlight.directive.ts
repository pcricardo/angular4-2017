import { Directive, OnInit, ElementRef, Renderer2,  HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighLight]'
})
export class BetterHighLightDirective implements OnInit {

  // using HostBinding to Bind to Host Properties
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';

  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // using HostListener to Listen to Host Events
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');

    // using HostBinding to Bind to Host Properties
    this.backgroundColor = this.highlightColor;
    //console.log('enter ' + eventData);
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // using HostListener to Listen to Host Events
    //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');

    // using HostBinding to Bind to Host Properties
    this.backgroundColor = this.defaultColor;
    //console.log('leave ' + eventData);
  }
}

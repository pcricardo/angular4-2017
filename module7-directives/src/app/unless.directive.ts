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

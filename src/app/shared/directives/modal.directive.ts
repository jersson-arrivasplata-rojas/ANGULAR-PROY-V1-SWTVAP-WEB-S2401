import { ComponentFactoryResolver, Directive, ElementRef, Renderer2, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appModalComponent]'
})
export class ModalComponentDirective {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  showModal(template:any) {
    this.viewContainerRef.clear();

    this.viewContainerRef.createEmbeddedView(template);

    this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
  }
}
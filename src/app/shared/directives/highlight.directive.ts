import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');  // Cambia el color de fondo a amarillo al pasar el rat\u00F3n sobre el elemento
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);  // Vuelve al color de fondo original al salir el rat\u00F3n
  }

  private highlight(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}

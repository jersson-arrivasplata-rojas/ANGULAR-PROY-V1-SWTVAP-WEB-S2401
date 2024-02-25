import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, Inject } from '@angular/core';

@Directive({
  selector: '[appScrollOnClick]'
})
export class ScrollOnClickDirective {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener('click')
  onClick() {
    const element = this.document.querySelector('.main-store-content');
    if (element) {
      element.scrollTop = 80;
    }
  }
}

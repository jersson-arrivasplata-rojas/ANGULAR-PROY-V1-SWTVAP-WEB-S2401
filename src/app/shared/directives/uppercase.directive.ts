import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const start = this.el.nativeElement.selectionStart;
    const end = this.el.nativeElement.selectionEnd;
    this.el.nativeElement.value = event.target.value.toUpperCase();
    this.el.nativeElement.setSelectionRange(start, end);
    event.preventDefault();
  }

}

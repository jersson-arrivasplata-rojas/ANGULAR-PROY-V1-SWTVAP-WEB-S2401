import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appLazyLoad]'
})
export class LazyLoadDirective implements AfterViewInit {
    @Input('appLazyLoad') src: string;

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = this.el.nativeElement;
                    img.src = this.src;
                    observer.unobserve(img);
                }
            });
        });
        observer.observe(this.el.nativeElement);
    }
}
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { CurrencyEnum } from '../config/currency.enum';

@Directive({
    selector: '[swtvapSwitchButton]' // Usa este selector para aplicar la directiva
})
export class SwitchButtonDirective {

    @Input() currencyActive;

    // Definir elementos de botón
    switchBtnRight: HTMLElement;
    switchBtnLeft: HTMLElement;
    activeSwitch: HTMLElement;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        // Esperar a que el DOM esté listo
        setTimeout(() => {
            this.switchBtnRight = this.el.nativeElement.querySelector('.switch-button-case.right');
            this.switchBtnLeft = this.el.nativeElement.querySelector('.switch-button-case.left');
            this.activeSwitch = this.el.nativeElement.querySelector('.active');

            // Configuración inicial
            if (this.currencyActive === CurrencyEnum.USD) {
                this.switchLeft(); // O switchRight(), dependiendo de la posición inicial deseada
            } else {
                this.switchRight(); // O switchLeft(), dependiendo de la posición inicial deseada
            }

        });
    }

    switchLeft() {
        this.renderer.removeClass(this.switchBtnRight, 'active-case');
        this.renderer.addClass(this.switchBtnLeft, 'active-case');
        this.renderer.setStyle(this.activeSwitch, 'left', '0%');
    }

    switchRight() {
        this.renderer.addClass(this.switchBtnRight, 'active-case');
        this.renderer.removeClass(this.switchBtnLeft, 'active-case');
        this.renderer.setStyle(this.activeSwitch, 'left', '50%');
    }

    @HostListener('click', ['$event.target'])
    onClick(btn) {
        if (btn === this.switchBtnLeft) {
            this.switchLeft();
        } else if (btn === this.switchBtnRight) {
            this.switchRight();
        }
    }
}

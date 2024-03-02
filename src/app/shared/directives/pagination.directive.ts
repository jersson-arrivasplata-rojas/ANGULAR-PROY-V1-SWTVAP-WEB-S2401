import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPagination]'
})
export class PaginationDirective implements AfterViewInit {
  @Input() positions: number[] = [];
  @Input() itemsPerPage = 10;
  private searchTerm: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.applyPagination();
  }

  applyPagination() {
    let table, trs, tds, searchTerm;
    let txtValues = [];
    const element = this.el.nativeElement;
    searchTerm = this.searchTerm.toLowerCase();// element.querySelector('input').value.toLowerCase();
    table = element.querySelector('table');
    trs = table.querySelectorAll('tbody tr');

    let currentPage = 1; // La p\u00E1gina actual
    let totalPages = Math.ceil(trs.length / this.itemsPerPage); // El n\u00FAmero total de p\u00E1ginas

    // Oculta todas las filas y luego muestra solo las de la p\u00E1gina actual
    for (let i = 0; i < trs.length; i++) {
      this.renderer.setStyle(trs[i], 'display', 'none');
    }

    for (let i = (currentPage - 1) * this.itemsPerPage; i < currentPage * this.itemsPerPage && i < trs.length; i++) {
      tds = trs[i].querySelectorAll('td');
      if (tds.length > 0) {
        let found = false;
        for (let j = 0; j < this.positions.length; j++) {
          txtValues[j] = tds[this.positions[j]].textContent.toLowerCase();
          if (txtValues[j].indexOf(searchTerm) > -1) {
            found = true;
            break;
          }
        }
        this.renderer.setStyle(trs[i], 'display', found ? '' : 'none');
      }
    }

    let uls = element.querySelectorAll('ul');
    uls.forEach(ul => this.renderer.removeChild(ul.parentNode, ul));

    // Genera los elementos de la paginaci\u00F3n
    const ul = this.renderer.createElement('ul');
    this.renderer.addClass(ul, 'pagination');
    this.renderer.addClass(ul, 'ml-2');
    for (let i = 1; i <= totalPages; i++) {
      const li = this.renderer.createElement('li');
      const a = this.renderer.createElement('a');
      const text = this.renderer.createText(`${i}`);
      this.renderer.addClass(li, 'page-item');
      if (i === 1) {
        this.renderer.addClass(li, 'active');
      }
      this.renderer.appendChild(a, text);
      this.renderer.addClass(a, 'page-link');
      this.renderer.setAttribute(a, 'href', 'javascript:void(0)');
      this.renderer.listen(a, 'click', () => {
        currentPage = i;
        this.updateTable(li, trs, currentPage);
      });
      this.renderer.appendChild(li, a);
      this.renderer.appendChild(ul, li);
    }
    this.renderer.appendChild(element, ul);
  }

  updateTable(li, trs, currentPage) {
    for (let j = 0; j < trs.length; j++) {
      this.renderer.setStyle(trs[j], 'display', 'none');
    }
    for (let j = (currentPage - 1) * this.itemsPerPage; j < currentPage * this.itemsPerPage && j < trs.length; j++) {
      this.renderer.setStyle(trs[j], 'display', '');
    }

    const activeElements = this.el.nativeElement.querySelectorAll('li.active');

    activeElements.forEach((element) => {
      this.renderer.removeClass(element, 'active');
    });

    this.renderer.addClass(li, 'active');
  }

  @Input() set search(value: string) {
    this.searchTerm = value;
    this.applyPagination();
  }
}

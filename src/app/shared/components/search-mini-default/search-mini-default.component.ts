import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-search-mini-default',
  templateUrl: './search-mini-default.component.html',
  styleUrls: ['./search-mini-default.component.css']
})
export class SearchMiniDefaultComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  busquedaExplorar(){
    this.router.navigateByUrl('/home/busqueda?address=PlanEmprededorBasico&product=Lima&store=Tiendita');
  }
}

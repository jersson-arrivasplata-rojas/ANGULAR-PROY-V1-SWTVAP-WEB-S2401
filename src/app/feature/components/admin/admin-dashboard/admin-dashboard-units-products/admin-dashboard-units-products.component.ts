import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { ProductUnitsHttp } from 'src/app/shared/http/product-units.http';
import { ProductHttp } from 'src/app/shared/http/products.http';
import { UnitHttp } from 'src/app/shared/http/units.http';


@Component({
  selector: 'app-admin-dashboard-units-products',
  templateUrl: './admin-dashboard-units-products.component.html',
  styleUrls: ['./admin-dashboard-units-products.component.css']
})
export class AdminDashboardUnitsProductsComponent implements OnInit {

  data: any[] = [];
  item = {};
  properties = {
    id: 0,
    type: ''
  };
  typesEnum = TypesEnum;

  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private productHttp: ProductHttp, private unitHttp: UnitHttp,
    private productUnitsHttp: ProductUnitsHttp, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const fullPath = this.router.url; // Obten la ruta completa
    const segments = fullPath.split('/'); // Divide la ruta en segmentos
    this.properties.type = segments[segments.length - 3];

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.properties.id = +params['id'];
          return this.properties.type === TypesEnum.UNITS ? this.productHttp.getAll() : this.unitHttp.getAll();
        }),
        mergeMap(data => {
          this.data = data;
          return this.productUnitsHttp.getAll();
        })
      )
      .subscribe(productUnits => {
        const allProductUnits = productUnits.filter(item => {
          if (this.properties.type === TypesEnum.PRODUCTS) {
            return item.product.productId === this.properties.id;
          } else {
            return item.unit.unitId === this.properties.id;
          }
        });
        let ids = [...new Set(allProductUnits.map(item => {
          return this.properties.type === TypesEnum.PRODUCTS ? item.unit.unitId : item.product.productId;
        }))];

        this.data.forEach(item => {
          if (ids.includes((item.unitId || item.productId))) {
            const id = allProductUnits.find(f=> f.unit.unitId === item.unitId || f.product.productId === item.productId).id;
            item.relationship = true;
            item.productUnitId = id;
          }
        });
      });
  }

  handleTableDeleted(data: any[]) {
    this.data = data;
  }


  handleTableShowed(data: any) {
    this.item = data.item;
    this.showItem = data.showItem;
    this.addItem = false;
    this.updateItem = false;

  }

  getType() {
    return this.properties.type === TypesEnum.UNITS ? 'Lista de Productos' : 'Lista de Unidades';
  }

  back(){
    this.router.navigate([`/admin/dashboard/${(this.properties.type === TypesEnum.UNITS)?'units':'products'}`]);
  }
}

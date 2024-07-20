import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, map, mergeMap, toArray } from 'rxjs';
import { ProductImagesHttp } from 'src/app/shared/http/product-images.http';
import { ProductHttp } from 'src/app/shared/http/products.http';
import { StorageHttp } from 'src/app/shared/http/storage.http';


@Component({
  selector: 'swtvap-admin-dashboard-products-images',
  templateUrl: './admin-dashboard-products-images.component.html',
  styleUrls: ['./admin-dashboard-products-images.component.css']
})
export class AdminDashboardProductsImagesComponent implements OnInit {

  data: any[] = [];
  item = {};
  productId = 0;
  product;
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private productImagesHttp: ProductImagesHttp, private productHttp: ProductHttp, private storageHttp: StorageHttp,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.productId = +params['id'];
          return this.productHttp.getById(this.productId);
        }),
        mergeMap(item => {
          this.product = item;
          return this.productImagesHttp.getAll();
        }),
      ).subscribe((productImagesData) => {
        this.data = productImagesData.filter((productImage) => productImage.productId === this.productId);
      });
  }

  handleAdded(data: any) {
    let fileNames: string[] = [];
    // Primero, crea un arreglo para almacenar los nombres de los archivos
    for (let i = 0; i < data.files.length; i++) {
      fileNames.push(data.files[i].name);
    }
    const uploadObservables = from(data.files).pipe(
      mergeMap((file: any) => { // Cambiado de switchMap a mergeMap
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folderName', 'products'); // Ajustar el nombre de la carpeta según sea necesario

        // Retornar el observable de la carga de cada archivo
        return this.storageHttp.uploadFile(formData);
      }),
      map((response, index) => {
        // Aquí puedes acceder al nombre del archivo correspondiente a esta respuesta usando fileNames[index]
        return { response, fileName: fileNames[index] };
      }),
      toArray() // Esto asegura que el resultado de uploadObservables sea un array de respuestas
    );

    uploadObservables.subscribe((responses: any[]) => {
      // Una vez completadas todas las cargas, proceder a realizar la acción final

    });
    this.productImagesHttp.add({ productId: data.productId, path: fileNames.join(",") }).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
      (window as any).success("¡Guardado!");
    });


  }

  handleUpdated(item: any) {
    this.data = this.data.map((data) => {
      if (data.productParameterId === item.productParameterId) {
        return {
          ...data,
          ...item
        };
      }
      return data;
    });
    this.addItem = false;
    this.updateItem = false;
    this.showItem = false;
  }

  handleTableUpdated(item: any) {
    this.item = item;
    this.updateItem = true;
    this.addItem = false;
    this.showItem = false;
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

  findDeletedAtInData() {
    return this.data.filter(item => !(item.deletedAt)).length;
  }

  back() {
    this.router.navigate([`/admin/dashboard/products`]);
  }
}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ColorEvent } from 'ngx-color';
import { Dimensions, ImageCroppedEvent, ImageTransform, base64ToFile } from 'ngx-image-cropper';
import { Metodos } from 'src/Utils/Metodos';
import { Image } from 'src/app/interfaces/image';
import { Store } from 'src/app/interfaces/store';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


declare var $: any;


let stores_uri = '';

@Component({
  selector: 'app-admin-dashboard-products',
  templateUrl: './admin-dashboard-products.component.html',
  styleUrls: ['./admin-dashboard-products.component.css']
})
export class AdminDashboardProductsComponent implements OnInit, AfterViewInit {
  public APP_URL = environment.appUrl;
  public APP_URL_API = environment.apiUrl;
  public APP_URL_API_BASE = environment.apiUrlBase;
  public APP_AWS_SNAPSTOREPEPUBLIC = environment.apiAWSsnapstorepepublic;

  placeholder = 'placeholder'

  content: any;


  @ViewChild('searchInput') searchInput: ElementRef;

  public idGeneral = '#STORE-DASHBOARD-PRODUCTOS';
  //timeInit = {hour: 13, minute: 30};
  //timeEnd = {hour: 13, minute: 30};
  public $products: any[] = [];
  public $categories: any[] = [];
  public $subcategories: any[] = [];
  public $subcategoriesArray: any[] = [];
  public $categoriesArray: any[] = [];
  public images: Image[] = [];

  public paginate = {
    current_page: 0,
    category_id: 0,
    subcategory_id: 0,
    total: 0,
    per_page: 0,
    last_page: 0,
    first_page_url: null,
    last_page_url: null,
    next_page_url: null,
    prev_page_url: null,
    path: null,
    from: 0,
    to: 0,
    search: ''

  };
  //content
  //products
  public tags: string[] = [];
  public store: Store = null;

  arrayToEndHead: string[] = [
    this.APP_URL + 'assets/css/vendor/quill.bubble.css',
    this.APP_URL + 'assets/css/vendor/quill.snow.css'
  ];

  constructor(public nodeStoreService: NodeStoreService, private localStorageService: LocalStorageService) {
    nodeStoreService.getStore().subscribe(data => {
      this.store = data.store;
    });
    Metodos.addCssFilesToEndHead(this.arrayToEndHead);
  }
  htmlContent = '';
  htmlContentEdit = '';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Ingresar texto...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  ngOnInit(): void {

    Metodos.menuDashboardActive('productos');
    $.getScript(this.APP_URL + 'assets/javascript/tours/dashboard/dashboard-productos-tour.js');
    this.getProductsIndex()
  }

  ngAfterViewInit() {
    $('#collapse').removeClass('show');
    $('#collapseEdit').removeClass('show');
  }
  addTag(target) {
    this.tags.push(target.value);
  }
  getProductsIndex() {
    let own = this;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/products',//ok

      type: 'GET',
      headers: {
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: { store_id: own.store.stores_id, current_page: own.paginate.current_page, search: own.paginate.search },
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        own.$subcategories = data.subcategories;
        own.$categories = data.categories;
        own.$categoriesArray = data.categories;
        own.$subcategoriesArray = data.subcategories;


        own.$products = data.content.data;//products
        //own.paginate.current_page = data.content.current_page;
        own.paginate.total = data.content.total;
        own.paginate.per_page = data.content.per_page;
      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
      }
    });
  }

  getSubCategoriesChange(value) {

    let own = this;

    $(own.idGeneral).find('#addModal').find('select[name=category]').val(value)
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/category/' + value + '/subcategories/products',//ok

      type: 'GET',
      headers: {
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: { store_id: own.store.stores_id, current_page: own.paginate.current_page, search: own.paginate.search },
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        own.$subcategoriesArray = data.subcategories;
        own.$subcategories = data.subcategories;
        own.$products = data.content.data;//products
        own.paginate.current_page = data.content.current_page;
        own.paginate.total = data.content.total;
        own.paginate.per_page = data.content.per_page;

        /*
current_page:1,
first_page_url: "http://192.168.0.10:8000/api/explorer/stores?current_page=0"
from: 9
last_page: 0
last_page_url: "http://192.168.0.10:8000/api/explorer/stores?current_page=0"
next_page_url: "http://192.168.0.10:8000/api/explorer/stores?current_page=0"
path: "http://192.168.0.10:8000/"
per_page: 10
prev_page_url: "http://192.168.0.10:8000/api/explorer/stores?current_page=0"
to: 0
total: 5
        */
        // own.$categories = data.categories;

      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
      }
    });
  }
  getProductsBySubcategoriesChange(value) {
    let own = this;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/category/subcategories/' + value + '/products',//ok

      type: 'GET',
      headers: {
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: { store_id: own.store.stores_id, current_page: own.paginate.current_page, search: own.paginate.search },
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        own.$products = data.content.data;//products
        // own.$categories = data.categories;
        own.paginate.current_page = data.content.current_page;
        own.paginate.total = data.content.total;
        own.paginate.per_page = data.content.per_page;

      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
      }
    });
  }

  //
  getSubcateriesChange(value) {
    let own = this;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/category/' + value + '/subcategories',//ok

      type: 'GET',
      headers: {
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: { store_id: own.store.stores_id, current_page: own.paginate.current_page, search: own.paginate.search },
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        own.$subcategoriesArray = data.subcategories;
        // own.$categories = data.categories;

      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
      }
    });
  }

  //https://codepen.io/satishmallick/embed/dyPXLxV?default-tab=result&height=462&pen-title=Create%20Dynamic%20Table%20Using%20Javascript&slug-hash=dyPXLxV&theme-id=default&user=satishmallick&name=cp_embed_1
  editModalProduct(self, id) {
    let own = this;
    $(own.idGeneral).find('#modalEdit').modal('show');


    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/products/' + id,//ok

      type: 'GET',
      headers: {
        "Authorization": localStorage.getItem('accessToken')
      },
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (response) {
        // console.log(data)

        if (response.content.length > 0) {
          let data = response.content[0];
          $(own.idGeneral).find("#modalEdit select[name=category]").val(data['category_id'])
          own.getSubcateriesChange(data['category_id']);
          $(own.idGeneral).find("#modalEdit input[name=id]").val(data['id'])

          $(own.idGeneral).find("#modalEdit select[name=subcategory]").val(data['subcategory_id'])
          $(own.idGeneral).find("#modalEdit input[name=name]").val(data['name']);
          $(own.idGeneral).find("#modalEdit textarea[name=description]").val(data['description']);
          $(own.idGeneral).find("#modalEdit input[name=unavailable]").prop('checked', ((data['unavailable'] == 1) ? true : false));
          $(own.idGeneral).find("#modalEdit input[name=status]").prop('checked', ((data['status'] == 1) ? true : false));
          $(own.idGeneral).find("#modalEdit input[name=url]").val(data['url']);
          $(own.idGeneral).find("#modalEdit input[name=tag_name]").val(data['tag_name']);
          $(own.idGeneral).find("#modalEdit input[name=products_images_tag_visible_edit]").prop('checked', ((data['images_tag_visible'] == 1) ? true : false));




          own.htmlContentEdit = data['description_html']
          own.tags = (data['tags'] == null) ? [] : data['tags'].split(',');
          //name="unit"name="url"

          for (let i = 0; i < (data['product_type_sale']).length; i++) {
            if (i == (data['product_type_sale']).length) { break; }
            let product_type_sale = data['product_type_sale'][i];
            $(own.idGeneral).find("#modalEdit input[name=product_sale_min]").val(product_type_sale['weight_min'])
            $(own.idGeneral).find("#modalEdit input[name=price]").val(product_type_sale['price'])
            $(own.idGeneral).find("#modalEdit input[name=discount]").val(product_type_sale['discount'])
            $(own.idGeneral).find("#modalEdit select[name=product_sale_status]").val(product_type_sale['type'])
            $(own.idGeneral).find("#modalEdit input[name=stock]").val(product_type_sale['stock'])
            $(own.idGeneral).find("#modalEdit input[name=product_type_sale_id]").val(product_type_sale['id'])
            $(own.idGeneral).find("#modalEdit select[name=unit]").val(product_type_sale['weight_min_unit']);

            own.images = data.product_images;
            break;
          }
        } else {
          $(own.idGeneral).find("#modalEdit input[name=name]").val('');
          $(own.idGeneral).find("#modalEdit textarea[name=description]").val('');
          $(own.idGeneral).find("#modalEdit input[name=url]").val('');

          $(own.idGeneral).find("#modalEdit input[name=product_sale_min]").val('')
          $(own.idGeneral).find("#modalEdit input[name=price]").val('')
          $(own.idGeneral).find("#modalEdit input[name=discount]").val('')
          $(own.idGeneral).find("#modalEdit input[name=stock]").val('')
          $(own.idGeneral).find("#modalEdit input[name=product_type_sale_id]").val('')
        }



        //$(own.idGeneral).find("select[id=select-unit]").val(data['unit']);
        //product_sale_min









      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');

      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
      }
    });
  }

  deleteModalProduct(self, id) {
    let own = this;
    Swal.fire({
      title: '¿Seguro de eliminar?',
      text: "¡Si elimina el producto no prodra recuperarlo. !",
      icon: 'warning',
      //showDenyButton: false,
      showCancelButton: true,
      //confirmButtonText: `Save`,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first mr-5',
        cancelButton: 'btn btn-danger-2'
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.isConfirmed) {
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/products/' + id,//

          type: 'DELETE',
          headers: {
            "Authorization": localStorage.getItem('accessToken')
          },
          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {
            let subcategory_id = $(own.idGeneral).find('#subcategory').val();
            own.getProductsBySubcategoriesChange(subcategory_id);
            //$(self).parent('tr').remove()
            Swal.fire(
              '¡Eliminado!',
              'Su información ha sido eliminada satisfactoriamente.',
              'success'
            )

          },
          error: function (xhr, status) {
            // alert('Disculpe, existió un problema');
            Swal.fire(
              'Cancelado',
              'Disculpe, existió un problema',
              'error'
            )
          }
        });

      } else if (result.isDenied) {
        Swal.fire(
          'Cancelado',
          'Su información esta segura ',
          'error'
        )
      }


    })
  }
  paginationChange(current_page: number) {
    // console.log(current_page);
    let own = this;
    let subcategory_id = $(own.idGeneral).find('#subcategory').val();

    if (subcategory_id == null || subcategory_id == '') {
      own.paginate.current_page = 0;
      this.getProductsIndex()
    } else {
      // own.getProductsBySubcategoriesChange(subcategory_id);
      if (current_page <= 0) {
        own.paginate.current_page = 0;
        this.getProductsBySubcategoriesChange(subcategory_id);
      } else {
        own.paginate.current_page = (current_page - 1);

        this.getProductsBySubcategoriesChange(subcategory_id);
      }
    }

  }

  searchTableProducts(element) {
    let own = this;
    console.log(element.value)
    own.paginate.search = element.value;
    own.paginate.current_page = 0;

    let subcategory_id = $(own.idGeneral).find('#subcategory').val();

    if (subcategory_id == null || subcategory_id == '') {
      this.getProductsIndex()
    } else {
      own.getSubcateriesChange(subcategory_id)
    }

  }
  /*  keyUpTableProducts(value){
     let own = this;
     console.log(value)
     console.log('input')
     own.paginate.search = value.target.value;
 
    }*/

  cleanTableProducts(element) {
    let own = this;
    own.paginate.search = '';
    own.paginate.current_page = 0;
    element.value = '';


    let subcategory_id = $(own.idGeneral).find('#subcategory').val();

    if (subcategory_id == null || subcategory_id == '') {
      this.getProductsIndex()
    } else {
      own.getSubcateriesChange(subcategory_id)
    }
  }


  addProduct() {
    let own = this;

    Swal.fire({
      title: '¿Seguro de agregar imagen?',
      text: "¡Si continuas no podras revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, agregar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first border-radius-15 mr-5',
        cancelButton: 'btn btn-danger-2  border-radius-15 '
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        own.isLoading = true;
        // console.log(own.croppedImage);
        // console.log(base64ToFile(own.croppedImage));
        var image = {
          src: (own.croppedImage).split(',')[1]
        };

        this.fileName = new Date().getTime() + '.jpeg';
        //console.log(this.fileName)
        let blob = own.base64ToBlob(image.src, 'image/jpeg');
        //console.log(blob)    
        var myFile = own.blobToFile(blob, "my-image.jpeg");
        //console.log(myFile)
        //let product_id= $(own.idGeneral).find('#addModal').find('input[name="id"]').val();
        //console.log(product_id);

        console.log((own.croppedImage).split(',')[1])



        let formData = new FormData()

        formData.append("store_id", (own.store.stores_id).toString());
        formData.append("file", myFile);
        own.images = [];

        let authorization = this.localStorageService.getItem('accessToken');

        fetch(this.APP_URL_API + 'dashboard/product/add/image', {
          method: 'POST',
          body: formData,
          mode: 'cors',
          headers: new Headers({
            'Authorization': authorization
          })
        })
          .then(response => {
            return response.json()
          }).then(data => {
            console.log(data)
            if (data.response == true) {
              //own.images=data.product_images;
              own.images.push({
                id: 0,
                product_id: 0,
                image: data.image,
                path: data.path,
                type: 0,
                description: '',
                visible: 0
              });
            }
            // own.isLoading = false;
            // $(own.idGeneral).find('.alerts').append(Metodos.insertAlert());
          }).then(data => {
            if (own.images.length > 0) {
              let category_id = $(own.idGeneral).find("#addModal select[name=category]").val()
              let subcategory_id = $(own.idGeneral).find("#addModal select[name=subcategory]").val()

              let unavailable = ($(own.idGeneral).find("#addModal input[name=unavailable]").prop('checked') == true) ? 1 : 0;
              let description = $(own.idGeneral).find("#addModal textarea[name=description]").val();
              let url = $(own.idGeneral).find("#addModal input[name=url]").val();

              let status = ($(own.idGeneral).find("#addModal input[name=status]").prop('checked') == true) ? 1 : 0;
              //let unit = $(own.idGeneral).find("#addModal input[name=unit]").val()
              //let stock = $(own.idGeneral).find("#addModal input[name=stock]").val()
              let name = $(own.idGeneral).find("#addModal input[name=name]").val()
              let tag_name = $(own.idGeneral).find("#addModal input[name=tag_name]").val()

              let images_tag_visible = ($(own.idGeneral).find("#addModal input[name=products_images_tag_visible_add]").prop('checked') == true) ? 1 : 0;

              let array = [];

              array.push({
                type: $(own.idGeneral).find("#addModal select[name=product_sale_status]").val(),
                weight_min: $(own.idGeneral).find("#addModal input[name=product_sale_min]").val(),
                weight_min_unit: $(own.idGeneral).find("#addModal select[name=unit]").val(),
                price: $(own.idGeneral).find("#addModal input[name=price]").val(),
                stock: $(own.idGeneral).find("#addModal input[name=stock]").val(),
                discount: $(own.idGeneral).find("#addModal input[name=discount]").val(),
              });

              let images = [];
              for (let i = 0; i < own.images.length; i++) {
                if (i == own.images.length) break;
                let type = 0;//f$(own.idGeneral).find('#addModal').find('#' + i + '-type').val();
                let description = null;//$(own.idGeneral).find('#addModal').find('#' + i + '-description').val();
                let visible = ($(own.idGeneral).find('#addModal').find('#' + i + '-visible').prop('checked') == true) ? 1 : 0;


                images.push({
                  //product_id:own.images[i].,
                  image: own.images[i].image,
                  type: type,
                  description: description,
                  visible: visible,
                });
              }


              let data = {
                category_id: category_id,
                subcategory_id: subcategory_id,
                name: name,
                //unit: unit,
                url: url,
                images: images,
                description: description,
                status: status,
                unavailable: unavailable,
                array: array,
                store_id: own.store.stores_id,
                description_html: own.htmlContent,
                tags: own.tags.join(','),
                tag_name: tag_name,
                images_tag_visible: images_tag_visible
              };
              $.ajax({
                // la URL para la petición
                url: own.APP_URL_API + 'dashboard/products',//ok

                data: data,

                type: 'POST',
                headers: {
                  "Authorization": localStorage.getItem('accessToken')
                },
                // el tipo de información que se espera de respuesta
                dataType: 'json',
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success: function (response) {
                  // console.log(data)

                  let subcategory_id = $(own.idGeneral).find('#subcategory').val();
                  own.getProductsBySubcategoriesChange(subcategory_id)

                  Swal.fire(
                    'Agregado!',
                    'El producto ha sido agregado satisfactoriamente.',
                    'success'
                  )
                },

                error: function (xhr, status) {
                  // alert('Disculpe, existió un problema');
                  Swal.fire(
                    'Cancelado',
                    'Disculpe, existió un problema',
                    'error'
                  )
                },

                // código a ejecutar sin importar si la petición falló o no
                complete: function (xhr, status) {
                  //  alert('Petición realizada');
                  $(own.idGeneral).find('#addModal').modal('hide');

                }
              });
            } else {
              Swal.fire(
                '¡No hay imagen de producto!',
                'Agregue una imagen para continuar.',
                'warning'
              )
            }

          }).catch(error => {

          });

      } else if (result.isDenied) {

      }
    });






  }
  editProduct() {
    let own = this;


    let id = $(own.idGeneral).find("#modalEdit input[name=id]").val();
    let product_type_sale_id = $(own.idGeneral).find("#modalEdit input[name=product_type_sale_id]").val();


    let category_id = $(own.idGeneral).find("#modalEdit select[name=category]").val()
    let subcategory_id = $(own.idGeneral).find("#modalEdit select[name=subcategory]").val()

    let unavailable = ($(own.idGeneral).find("#modalEdit input[name=unavailable]").prop('checked') == true) ? 1 : 0;
    let description = $(own.idGeneral).find("#modalEdit textarea[name=description]").val();
    let url = $(own.idGeneral).find("#modalEdit input[name=url]").val();

    let status = ($(own.idGeneral).find("#modalEdit input[name=status]").prop('checked') == true) ? 1 : 0;
    //let unit = $(own.idGeneral).find("#modalEdit input[name=unit]").val()
    //let stock = $(own.idGeneral).find("#addModal input[name=stock]").val()
    let name = $(own.idGeneral).find("#modalEdit input[name=name]").val()
    let tag_name = $(own.idGeneral).find("#modalEdit input[name=tag_name]").val()

    let images_tag_visible = ($(own.idGeneral).find("#modalEdit input[name=products_images_tag_visible_edit]").prop('checked') == true) ? 1 : 0;



    let array = [];
    array.push({
      id: product_type_sale_id,
      type: $(own.idGeneral).find("#modalEdit select[name=product_sale_status]").val(),
      weight_min: $(own.idGeneral).find("#modalEdit input[name=product_sale_min]").val(),
      weight_min_unit: $(own.idGeneral).find("#modalEdit select[name=unit]").val(),
      price: $(own.idGeneral).find("#modalEdit input[name=price]").val(),
      stock: $(own.idGeneral).find("#modalEdit input[name=stock]").val(),
      discount: $(own.idGeneral).find("#modalEdit input[name=discount]").val()
    });


    let data = {
      category_id: category_id,
      subcategory_id: subcategory_id,
      name: name,
      //unit: unit,
      url: url,
      image: null,
      description: description,
      status: status,
      unavailable: unavailable,
      array: array,
      description_html: own.htmlContentEdit,
      tags: own.tags.join(','),
      tag_name: tag_name,
      images_tag_visible: images_tag_visible
    };

    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/products/' + id,//ok

      type: 'PUT',
      headers: {
        "Authorization": localStorage.getItem('accessToken')
      },
      data: data,

      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (response) {
        // console.log(data)

        let subcategory_id = $(own.idGeneral).find('#subcategory').val();
        own.getProductsBySubcategoriesChange(subcategory_id)
        Swal.fire(
          'Actualizado!',
          'La Subcategoria ha sido actualizado satisfactoriamente.',
          'success'
        )
      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
        Swal.fire(
          'Cancelado',
          'Disculpe, existió un problema',
          'error'
        )
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
        $(own.idGeneral).find('#modalEdit').modal('hide');
      }
    });
  }

  //Image
  transform: ImageTransform = {};
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  fileNameProduct: string;
  fileName: string;

  croppedImageProduct: any = this.APP_URL + 'assets/images/snapstore/placeholder-200X200-2.png';
  croppedImage: any = this.APP_URL + 'assets/images/snapstore/placeholder-200X200-2.png';
  imageChangedProductEvent: any = '';

  imageChangedEvent: any = '';
  containWithinAspectRatio = false;

  showCropperProduct = false;
  showCropper = false;



  isLoadingProduct: boolean = false;
  isLoading: boolean = false;

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
    this.isLoading = false;
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }
  imageCroppedProduct(event: ImageCroppedEvent) {
    this.croppedImageProduct = event.base64;
    console.log(event, base64ToFile(event.base64));
  }
  imageLoadedProduct() {
    this.showCropperProduct = true;
    console.log('Image loaded');
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event, base64ToFile(event.base64));
  }
  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }
  fileChangeEventProduct(event: any): void {
    this.imageChangedProductEvent = event;
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  saveImageProductEdit() {
    let own = this;
    Swal.fire({
      title: '¿Seguro de agregar imagen?',
      text: "¡Si continuas no podras revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, agregar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first border-radius-15 mr-5',
        cancelButton: 'btn btn-danger-2  border-radius-15 '
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        own.isLoadingProduct = true;
        // console.log(own.croppedImage);
        // console.log(base64ToFile(own.croppedImage));
        var image = {
          src: (own.croppedImageProduct).split(',')[1]
        };

        this.fileNameProduct = new Date().getTime() + '.jpeg';
        //console.log(this.fileName)
        let blob = own.base64ToBlob(image.src, 'image/jpeg');
        //console.log(blob)    
        var myFile = own.blobToFile(blob, "my-image.jpeg");
        //console.log(myFile)
        let product_id = $(own.idGeneral).find('#modalEdit').find('input[name="id"]').val();
        console.log(image);
        let formData = new FormData()
        formData.append("product_id", product_id);
        formData.append("store_id", (own.store.stores_id).toString());
        formData.append("file", myFile);
        own.images = [];
        //console.log(formData)


        let authorization = this.localStorageService.getItem('accessToken');
        fetch(this.APP_URL_API + 'dashboard/product/edit/image', {
          method: 'POST',
          body: formData,
          mode: 'cors',  //no-
          headers: new Headers({
            'Authorization': authorization,
            'Access-Control-Allow-Origin': '*'
          })
        })
          .then(response => {
            return response.json()
          }).then(data => {
            console.log(data)
            if (data.response == true) {
              own.images = data.product_images;
              /*
                            own.images.push({
                              id:data.id,
                              product_id:data.product_id,
                              image:data.image,
                              path: data.path,
                              type:data.type,
                              description:data.description
                            });*/
            }
            own.isLoadingProduct = false;
            $(own.idGeneral).find('.alerts').append(Metodos.insertAlert());
          });

      } else if (result.isDenied) {

      }
    });
  }
  saveImageProduct() {
    let own = this;
    Swal.fire({
      title: '¿Seguro de agregar imagen?',
      text: "¡Si continuas no podras revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, agregar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first border-radius-15 mr-5',
        cancelButton: 'btn btn-danger-2  border-radius-15 '
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        own.isLoading = true;
        // console.log(own.croppedImage);
        // console.log(base64ToFile(own.croppedImage));
        var image = {
          src: (own.croppedImage).split(',')[1]
        };

        this.fileName = new Date().getTime() + '.jpeg';
        //console.log(this.fileName)
        let blob = own.base64ToBlob(image.src, 'image/jpeg');
        //console.log(blob)    
        var myFile = own.blobToFile(blob, "my-image.jpeg");
        //console.log(myFile)
        //let product_id= $(own.idGeneral).find('#addModal').find('input[name="id"]').val();
        //console.log(product_id);

        console.log((own.croppedImage).split(',')[1])



        let formData = new FormData()

        formData.append("store_id", (own.store.stores_id).toString());
        formData.append("file", myFile);
        own.images = [];

        let authorization = this.localStorageService.getItem('accessToken');

        fetch(this.APP_URL_API + 'dashboard/product/add/image', {
          method: 'POST',
          body: formData,
          mode: 'cors',
          headers: new Headers({
            'Authorization': authorization
          })
        })
          .then(response => {
            return response.json()
          }).then(data => {
            console.log(data)
            if (data.response == true) {
              //own.images=data.product_images;
              own.images.push({
                id: 0,
                product_id: 0,
                image: data.image,
                path: data.path,
                type: 0,
                description: '',
                visible: 0
              });
            }
            own.isLoading = false;
            $(own.idGeneral).find('.alerts').append(Metodos.insertAlert());
          });

      } else if (result.isDenied) {

      }
    });
  }
  blobToFile(theBlob: Blob, fileName: string): File {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

  base64ToBlob(base64, mime) {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
      var slice = byteChars.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
  }
  //Image
  public expand_edit: boolean = false;
  public expand: boolean = false;

  expandEdit() {
    this.expand_edit = !this.expand_edit;
  }

  expandAdd() {
    this.expand = !this.expand;
  }


  getImageProductEdit(id, product_id, image, path) {
    //let element:any = document.querySelector('#modalEdit').querySelector('input[name="id"]');
    //let product_id = element.value;
    return this.APP_AWS_SNAPSTOREPEPUBLIC + path + 'xs/' + image;

  }

  getImageProduct(image) {
    return this.APP_AWS_SNAPSTOREPEPUBLIC + 'stores/' + this.store.stores_id + '/' + 'products/upload/xs/' + image;

  }
  isLoadingDeleteTypeProduct: boolean = false;
  deleteImageProductEdit(id, product_id) {
    let own = this;
    Swal.fire({
      title: '¿Seguro de eliminar imagen?',
      text: "¡Si continuas no podras revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first border-radius-15 mr-5',
        cancelButton: 'btn btn-danger-2  border-radius-15 '
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        own.isLoadingDeleteTypeProduct = true;
        let data = {
          id: id,
          product_id: product_id
        };
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/product/image/delete',//ok

          type: 'POST',
          headers: {
            "Authorization": localStorage.getItem('accessToken')
          },
          data: data,

          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {
            own.images = data.product_images;
            Swal.fire(
              'Eliminado!',
              'Ha sido eliminado satisfactoriamente.',
              'success'
            )
          },

          error: function (xhr, status) {
            Swal.fire(
              'Cancelado',
              'No pudo eliminarse correctamente',
              'error'
            )
          },
          complete: function (xhr, status) {
            own.isLoadingDeleteTypeProduct = false;
          }
        });
      } else if (result.isDenied) {

      }
    });
  }
  deleteImageProduct(index, image) {
    let own = this;
    Swal.fire({
      title: '¿Seguro de eliminar imagen?',
      text: "¡Si continuas no podras revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first border-radius-15 mr-5',
        cancelButton: 'btn btn-danger-2  border-radius-15 '
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        own.isLoadingDeleteTypeProduct = true;
        let data = {
          image: image
        };
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/product/add/image/delete',//ok

          type: 'POST',
          headers: {
            "Authorization": localStorage.getItem('accessToken')
          },
          data: data,

          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {
            Swal.fire(
              'Eliminado!',
              'Ha sido eliminado satisfactoriamente.',
              'success'
            )
            delete own.images[index];
          },

          error: function (xhr, status) {
            Swal.fire(
              'Cancelado',
              'No pudo eliminarse correctamente',
              'error'
            )
          },
          complete: function (xhr, status) {
            own.isLoadingDeleteTypeProduct = false;
          }
        });
      } else if (result.isDenied) {

      }
    });
  }
  changeColorEditComplete($event: ColorEvent, j): void {
    let type = j + '-type-edit';
    let description = j + '-description-edit';
    $(this.idGeneral).find('#' + description).val($event.color.hex)
    $(this.idGeneral).find('#' + type).val(1)

  }
  changeColorComplete($event: ColorEvent, j): void {
    let type = j + '-type';
    let description = j + '-description';
    $(this.idGeneral).find('#' + description).val($event.color.hex)
    $(this.idGeneral).find('#' + type).val(1)

  }
  public isLoadingEditTypeProduct: boolean = false;
  public isLoadingTypeProduct: boolean = false;

  saveProductImageType(id, product_id, j) {
    let own = this;
    let type = j + '-type-edit';
    let description = j + '-description-edit';
    let visible = j + '-visible-edit';

    if ($(this.idGeneral).find('#' + description).val() == null || $(this.idGeneral).find('#' + description).val() == '') {
      Swal.fire(
        '¡Agregue un Tipo!',
        'Aún no ha agregado un tipo a la imagen.',
        'warning'
      )
      return false;
    } else {
      Swal.fire({
        title: '¿Seguro de agregar tipo?',
        text: "¡Si continuas no podras revertir los cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0CC27E',
        cancelButtonColor: '#FF586B',
        confirmButtonText: '¡Si, agregar!',
        cancelButtonText: '¡No, cancelar!',
        customClass: {
          confirmButton: 'btn btn-first border-radius-15 mr-5',
          cancelButton: 'btn btn-danger-2  border-radius-15 '
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          own.isLoadingEditTypeProduct = true;
          let data = {
            id: id,
            product_id: product_id,
            type: $(this.idGeneral).find('#' + type).val(),
            description: $(this.idGeneral).find('#' + description).val(),
            visible: ($(this.idGeneral).find('#' + visible).prop("checked") == false) ? 0 : 1,
          };
          $.ajax({
            // la URL para la petición
            url: own.APP_URL_API + 'dashboard/product/edit/image/type',//ok

            type: 'POST',
            headers: {
              "Authorization": localStorage.getItem('accessToken')
            },
            data: data,

            // el tipo de información que se espera de respuesta
            dataType: 'json',
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (data) {
              own.images = data.product_images;
              Swal.fire(
                'Actualizado!',
                'Ha sido actualizado satisfactoriamente.',
                'success'
              )
            },

            error: function (xhr, status) {
              Swal.fire(
                'Cancelado',
                'No pudo agregarse correctamente',
                'error'
              )
            },
            complete: function (xhr, status) {
              own.isLoadingEditTypeProduct = false;
            }
          });
        } else if (result.isDenied) {

        }
      });
    }
    return true;
  }
  addModalProduct() {
    let own = this;
    own.tags = []
    $(own.idGeneral).find('#addModal').modal('show');

    $(own.idGeneral).find("#addModal input[name=name]").val('');
    $(own.idGeneral).find("#addModal textarea[name=description]").val('');
    $(own.idGeneral).find("#addModal input[name=url]").val('');
    $(own.idGeneral).find("#addModal input[name=product_sale_min]").val('')
    $(own.idGeneral).find("#addModal input[name=price]").val('')
    $(own.idGeneral).find("#addModal input[name=discount]").val('')
    $(own.idGeneral).find("#addModal input[name=stock]").val('')
    $(own.idGeneral).find("#addModal input[name=product_type_sale_id]").val('')
    $(own.idGeneral).find("#addModal select[name=product_sale_status]").val('unit')
    $(own.idGeneral).find("#addModal input[name=unavailable]").prop('checked', true);
    $(own.idGeneral).find("#addModal input[name=status]").prop('checked', true);
    $(own.idGeneral).find("#addModal select[name=unit]").val('');

    $(own.idGeneral).find("#addModal input[name=products_images_tag_visible_add]").prop('checked', false);

    let category_id = $(own.idGeneral).find('#category').val();
    let subcategory_id = $(own.idGeneral).find('#subcategory').val();

    own.getSubcateriesChange(category_id);
    own.productCleanImages();
    //$(own.idGeneral).find("#modalEdit select[name=category]").val(data['category_id'])
    //own.getSubcateriesChange(data['category_id']);


  }
  productCleanImages() {
    let own = this;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/product/image/clean',

      type: 'POST',
      headers: {
        "Authorization": localStorage.getItem('accessToken')
      },
      data: { store_id: own.store.stores_id },

      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {
      },

      error: function (xhr, status) {
      },
      complete: function (xhr, status) {
        own.isLoadingDeleteTypeProduct = false;
      }
    });
  }
  public getImage(product_images) {
    if (product_images.length > 0) {
      return this.APP_AWS_SNAPSTOREPEPUBLIC + (product_images[0].image).replace('lg/', 'xs/');
    }
    return this.APP_URL + 'assets/images/placeholder/gray400X400.png';
  }

  public removeTag(x) {
    let own = this;
    Swal.fire({
      title: '¿Seguro de eliminar el tag ?',
      text: "¡Si continuas no podras revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first border-radius-15 mr-5',
        cancelButton: 'btn btn-danger-2  border-radius-15 '
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        let array = own.tags.splice(x, 1);
        // own.tags=array;
      } else if (result.isDenied) {

      }
    });

  }
}
//https://www.acontracorrientech.com/pipes-en-angular-guia-completa/



    //https://quilljs.com/guides/cloning-medium-with-parchment/
/*var FontAttributor = Quill.import('attributors/class/font');
FontAttributor.whitelist = [
  'sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu'
];
Quill.register(FontAttributor, true);*/
    //https://github.com/quilljs/quill/issues/1730
    //https://quilljs.com/docs/modules/toolbar/

/*
 toolbar: [
      [
        { font: [] },
        { size: [ 'small', false, 'large', 'huge' ] }
      ],
      [ 'bold', 'italic', 'underline', 'strike' ],
      [
        { color: [] },
        { background: [] }
      ],
      [
        { 'script': 'super' },
        { 'script': 'sub' }
      ],
      [
        { header: [1, 2, 3, 4, 5, 6, false] }
      ],
      [
        { 'list': 'ordered' },
        { 'list': 'bullet'},
        { 'indent': '-1' },
        { 'indent': '+1' }
      ],
      [
        {'direction': 'rtl'},
        { 'align': [] }
      ],
      [ 'link', 'image', 'video', 'formula' ],
      [ 'clean' ]
    ],
*/
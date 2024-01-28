import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/interfaces/store';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { environment } from 'src/environments/environment';
import { Emojis } from 'src/Utils/Emojis';
import { Metodos } from 'src/Utils/Metodos';
import Swal from 'sweetalert2';

declare var $: any;
let stores_uri = '';
let stores_id = '';

@Component({
  selector: 'app-admin-dashboard-categories',
  templateUrl: './admin-dashboard-categories.component.html',
  styleUrls: ['./admin-dashboard-categories.component.css']
})
export class AdminDashboardCategoriesComponent implements OnInit {
  public APP_URL = environment.appUrl;
  public APP_URL_API = environment.apiUrl;
  public idGeneral = '#STORE-DASHBOARD-CATEGORIAS';

   preloadDashboard:boolean=false;
   isLoadingUpdate:boolean=false;

  public $categories: any[]=[];
  public $stores_uri:string;
//Emojis

  store:Store=null;
  constructor(public nodeStoreService:NodeStoreService) {
    nodeStoreService.getStore().subscribe(data=>{
      this.store = data.store;
    }); 
   }

  ngOnInit(): void {
    Metodos.menuDashboardActive('categorias');

    $.getScript(this.APP_URL+'assets/javascript/tours/dashboard/dashboard-categoria-tour.js');
    
    this.getCategories();
   // console.log(arrEmojis);
  }
  listOrderChanged($event){
    console.log($event)
    let own = this;
    let array = [...$event];
    const sortedData = new Array();
    array.forEach((item, index) =>{
      sortedData.push({
          id: item.id,
          position: index + 1
      });
    });

    $.ajax({
      // la URL para la petición
      //url : '../update-positionc',
      url: own.APP_URL_API + 'dashboard/categories/update-positions',//

      data : { sorted:sortedData,store_id:own.store.stores_id},

      type : 'POST',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      // el tipo de información que se espera de respuesta
      dataType : 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success : function(data) {
          //var data=json['resp'];
        //  console.log("data",data);
        own.$categories = data.categories;



      },

  });
  }
  popoverIcon($event){
    let own=this;
    $event.stopPropagation();
    setTimeout(function(){
      let arrEmojis = Emojis.arrEmojis();

      for (let index = 0; index < arrEmojis.length; index++) {
        let element = arrEmojis[index];
        for (let indexj = 0; indexj < element.length; indexj++) {
            let elementf = element[indexj];
            $(own.idGeneral).find('#addModal .myTabContent .tab-pane').eq(index).append('<span class="emojiP-first">' + elementf + '</span>')
            $(own.idGeneral).find('#editModal .myTabContent .tab-pane').eq(index).append('<span class="emojiP-second">' + elementf + '</span>')

            //$('.myTabContent .tab-pane').eq(index + 12).append('<span class="emojiP-second">' + elementf + '</span>')
            //$('.myTabContent .tab-pane').eq(index + 24).append('<span class="emojiP-three">' + elementf + '</span>')
            //$('.myTabContent .tab-pane').eq(index + 36).append('<span class="emojiP-fourth">' + elementf + '</span>')
            //$('.myTabContent .tab-pane').eq(index + 48).append('<span class="emojiP-five">' + elementf + '</span>')
  
        }
      }

      let emojisFirst = document.querySelectorAll('.emojiP-first');

      for (let index = 0; index < emojisFirst.length; index++) {
        let element = emojisFirst[index];
        element.addEventListener('click', function($event){
          console.log($($event.target));
          var text = $(own.idGeneral).find('.modal').find('.description-category').text();
          var emoji = $($event.target).text();
          $(own.idGeneral).find('.modal').find('.description-category').html(text + emoji)
        });
      }



      let emojisSecond = document.querySelectorAll('.emojiP-second');
      for (let index = 0; index < emojisSecond.length; index++) {
        let element = emojisSecond[index];
        element.addEventListener('click', function($event){
          console.log($($event.target));
          var text = $(own.idGeneral).find('.modal').find('.description-category-edit').text();
          var emoji = $($event.target).text();
          $(own.idGeneral).find('.modal').find('.description-category-edit').html(text + emoji)
        });
      }
    },1000);
//.emojiP-fourth,.emojiP-second,,.emojiP-three

 

  
    /*
      $('.emojiP-fourth,.emojiP-second,.emojiP-first,.emojiP-three').on('click', function() {
        var text = $(this).parents('.input-group').find('.input-group-preppend').find('div').text();
        var emoji = $(this).text();
        $(this).parents('.input-group').find('.input-group-preppend').find('div').html(text + emoji)
    });
    */
  }
  widthCarousel(rest = 32) { //120
    var carousel_content = $('.carousel').find('.content').length;
    $('.carousel').width((carousel_content * 100) - (rest))
  }

  deleteModalCategory(self, id) {

    let own = this;
    Swal.fire({
      title: '¿Seguro de eliminar?',
      text: "¡Si Eliminas la categoría, tambien se Eliminaran las Subcategorias y Productos que le partenecen. !",
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
          url: own.APP_URL_API + 'dashboard/categories/'+ id+'/'+own.store.stores_id,//

          type: 'DELETE',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {
            own.$categories = data.categories;

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
  editModalCategory(self, id) {
    let own = this;
    $(own.idGeneral).find('#editModal').modal('show');
    $(self).tooltip('hide')
    $(own.idGeneral).find("#editModal input[name=id]").attr('value', id);

    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/categories/' + id + '/edit',//ok

      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        //console.log(data);
        var description = document.getElementById("description-category-edit");
        description.textContent = data['description'];
        // $("#editModal .card-img").attr('src','assets/images/users/categories/'+data['image']);
        //alert(data['status']);
        $(own.idGeneral).find("#editModal input[name=categoria_visible]").attr('value', data['status']); // aca seteo el valor al input
        var c = $(own.idGeneral).find("#editModal input[name=categoria_visible]").val(); // aca me imprime el valor que tiene ese input

        if (c == 1) {
          $(own.idGeneral).find("#editModal input[name=categoria_visible]").prop('checked', true);
        } else {
          $(own.idGeneral).find("#editModal input[name=categoria_visible]").prop('checked', false);
        }
        if (data['image'] == null || data['image'] == "") {
         // $("#editModal .card-img").attr('src', '../' + IMG_ASSETS);
        } else {
          /*this.getDataUri('assets/images/users/categories/' + data['image'], function (dataUri) {
            //  console.log(dataUri)
            $("#editModal .card-img").attr('src', dataUri);
          });*/
        }

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

  getCategories() {
    let own = this;
    this.preloadDashboard = false;
    Metodos.insertPreloadStoreRemoveHidden('PRELOAD-DASHBOARD-CATEGORIAS', this.getImagePrincipal(), this.store.stores_name);
  
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/categories',//ok

      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      //data: { id: own.$stores_id },
      data: {store_id:own.store.stores_id},
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        own.$categories = data.categories;
      },

      error: function (xhr, status) {
        // alert('Disculpe, existió un problema');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        //  alert('Petición realizada');
        own.preloadDashboard = true;
        Metodos.removeNodoPreloadHidden('PRELOAD-DASHBOARD-CATEGORIAS');
      }
    });
  }
  public getImagePrincipal() {
    return (this.store?.stores_image == null || this.store?.stores_image == '') ? Metodos.getImageDefault100X100(this.APP_URL) : this.store?.stores_image_url;
}
  addModalCategory(){
    let own = this;
    $(own.idGeneral).find('.alerts').empty();

        var description = document.getElementById("description-category").innerHTML;
        var status = [];

        $(own.idGeneral).find("#addModal input[name=categoria_visible]").each(function() {
            var val = this.type == "checkbox" ? +this.checked : this.value;
            status.push(val);
        });

        var image = '';
        var data = { description: description, status: status.toString(),  image:null,store_id:own.store.stores_id  }; //image: image, 

       /* if (image == IMG_ASSETS) {
            data.image = '';
        } else {
            image = $("#addModal [name=categoria_image]").attr('src');
            data.image = image;
        }*/
        $.ajax({
            // la URL para la petición
            url: own.APP_URL_API + 'dashboard/categories' ,//ok

            data: data,

            type: 'POST',
            headers: { 
              "Authorization": localStorage.getItem('accessToken')
            },
            // el tipo de información que se espera de respuesta
            dataType: 'json',
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function(data) {
                // console.log(json);
                own.$categories = data.categories;
                $(own.idGeneral).find('#addModal').modal('hide')
                $(own.idGeneral).find('.alerts').append('<div class="alert alerta alert-success " role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close">X</button>👍 Agregado exitoso!!!</div> ')

                Swal.fire(
                    'Agregado!',
                    'La Categoria ha sido agregado satisfactoriamente.',
                    'success'
                )

            },

            error: function(xhr, status) {
                // alert('Disculpe, existió un problema');
                Swal.fire(
                    'Cancelado',
                    'Disculpe, existió un problema',
                    'error'
                )
            }
        });
  }
  updateModalCategory(){
    let own = this;
    $(own.idGeneral).find('.alerts').empty();


    var description = document.getElementById("description-category-edit").innerHTML;


    var status:any = [];
    var id = $(own.idGeneral).find("#editModal input[name=id]").val();


    $(own.idGeneral).find("#editModal input[name=categoria_visible]").each(function() {
        var val = this.type == "checkbox" ? +this.checked : this.value;
        status.push(val);
    });




    var data = { description: description, status: status.toString(),image:null,store_id:own.store.stores_id };

    var image = $(own.idGeneral).find("#editModal [name=categoria_image]").attr('src');
    /*if (image == IMG_ASSETS) {
        data.image = '';
    } else {
        image = $("#editModal [name=categoria_image]").attr('src');
        data.image = image;
    }*/


    if (($(own.idGeneral).find('#editModal div[name="categoria_name"]').text()).length <= 0) {
    
        return false;
    } else {
        own.isLoadingUpdate=true;
        $.ajax({
            // la URL para la petición
            url: own.APP_URL_API + 'dashboard/categories/' + id,//ok

            data: data,

            type: 'PUT',
            headers: { 
              "Authorization": localStorage.getItem('accessToken')
            },
            // el tipo de información que se espera de respuesta
            dataType: 'json',
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function(data) {
                 own.$categories = data.categories;
                $(own.idGeneral).find('#editModal').modal('hide')
                $(own.idGeneral).find('.alerts').append(Metodos.updateAlert());

            },

            error: function(xhr, status) {
                // alert('Disculpe, existió un problema');
                $(own.idGeneral).find('.alerts').append(Metodos.noUpdateAlert());

            },
  
            complete: function (xhr, status) {
              own.isLoadingUpdate=false;
            }

        });
        return true;
    }
  }
  /*getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
      canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

      canvas.getContext('2d').drawImage(this, 0, 0);

      // Get raw image data
      callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

      // ... or get as Data URI
      callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
  }*/
}

import { AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, EventEmitter, Injectable, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Select2Data, Select2Value } from 'ng-select2-component';
import { Options } from 'select2';
import { Metodos } from 'src/Utils/Metodos';
import { Department } from 'src/app/interfaces/department';
import { District } from 'src/app/interfaces/district';
import { Hour } from 'src/app/interfaces/hour';
import { Province } from 'src/app/interfaces/province';
import { Store } from 'src/app/interfaces/store';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'dashboard-hour-content',
  templateUrl: './dashboard-hour-content.html',
  styleUrls: [
    './dashboard-hour-content.css'
  ]
})

export class DashboardHourContent implements OnInit {
  public APP_URL = environment.appUrl;
  public APP_URL_API = environment.apiUrl;
  public idGeneral = '#STORE-DASHBOARD-PERFIL';
  public store:Store=null;
  isLoadingDeleteHour: boolean = false;
  isLoadingUpdateHour: boolean = false;


  @Input() public $horarios: Hour[];
  @Output() eventHour: EventEmitter<number> = new EventEmitter<number>();


  timeInit: string = '04:00:00';
  timeEnd: string = '21:00:00';

  constructor(public nodeStoreService:NodeStoreService) {
    nodeStoreService.getStore().subscribe(data=>{
      this.store = data.store;

      

    });
  }
  ngOnInit(): void {

  }
  updateHour(self, id) {
    let own = this;



    $(own.idGeneral).find('#hourModal').modal('show');
    $(own.idGeneral).find("#hourModal input[name=id]").attr('value', id);
    own.isLoadingUpdateHour=true;
    $.ajax({
      url: own.APP_URL_API + 'dashboard/home/' + id + '/get-hour',
      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      dataType: 'json',
      success: function (data) {
        own.timeInit=data.time_start;
        own.timeEnd=data.time_end;
        $(own.idGeneral).find('#hourModal').find('select[name="day"]').val(data.day)
      },
      error: function (xhr, status) {
        if (status == "error") {
          //responseJSON
          var data = xhr.responseJSON;
          var text = "<ul style='list-style: none;padding: 0;'>"
          var keys_errors = Object.keys(data.errors);

          for (var j = 0; j < keys_errors.length; j++) {
            for (var i = 0; i < data.errors[keys_errors[j]].length; i++) {
              text += "<li>" + data.errors[keys_errors[j]][i] + "</li>"
            }
          }
          text += "</ul>"
          Swal.fire(
            '¡Error!',
            'Verifique lo siguiente:<br>' + text,
            'error'
          )
        }
      },
      complete: function (xhr, status) {
        own.isLoadingUpdateHour=false;

      }
    });
  }
  deleteHour(self, id) {
    let own = this;

    Swal.fire({
      title: '¿Seguro de eliminar?',
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
        own.isLoadingDeleteHour=true;
        $.ajax({
          url: own.APP_URL_API + 'dashboard/home/hour/' + id,//ok

          type: 'DELETE',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {

            own.eventHour.emit(1);
            


          },
          error: function (xhr, status) {
            // alert('Disculpe, existió un problema');
          },

          // código a ejecutar sin importar si la petición falló o no
          complete: function (xhr, status) {
            //  alert('Petición realizada');
            own.isLoadingDeleteHour=false;
            $(own.idGeneral).find('.alerts').append(Metodos.deleteAlert());

          }
        });
      } else if (result.isDenied) {
       
      }
    });
  }

  btnHourUpdate() {
    let own = this;

    var data: any = {}
    
    data.id = own.store.stores_id;
    data.day = $(own.idGeneral).find('#hourModal').find('select[name="day"]').val()
    data.time_start = own.timeInit;
    data.time_end = own.timeEnd;
    if (data.day == "Lunes") {
      data.acronym = "LU";
      data.position = 1;
    }
    if (data.day == "Martes") {
      data.acronym = "MA";
      data.position = 2;
    }
    if (data.day == "Miercoles") {
      data.acronym = "MI";
      data.position = 3;
    }
    if (data.day == "Jueves") {
      data.acronym = "JU";
      data.position = 4;
    }
    if (data.day == "Viernes") {
      data.acronym = "VI";
      data.position = 5;
    }
    if (data.day == "Sábado") {
      data.acronym = "SA";
      data.position = 6;
    }
    if (data.day == "Domingo") {
      data.acronym = "DO";
      data.position = 7;
    }

    if ($(own.idGeneral).find('#hourModal').find('select[name="day"]').val() == "" ||
      $(own.idGeneral).find('#hourModal').find('input[name="time_start"]').val() == "" ||
      $(own.idGeneral).find('#hourModal').find('input[name="time_end"]').val() == "") {

    } else {
      own.isLoadingUpdateHour=true;

      $.ajax({
        // la URL para la petición
        url: own.APP_URL_API + 'dashboard/home/add-hour',//ok

        data: data,

        type: 'POST',
        headers: { 
          "Authorization": localStorage.getItem('accessToken')
        },
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (json) {
          //    console.log(json);
          own.eventHour.emit(1);
          $(own.idGeneral).find('#hourModal').modal('hide')
          //own.getAll()
        },

        error: function (xhr, status) {
          // alert('Disculpe, existió un problema');
          if (status == "error") {
            //responseJSON
            var data = xhr.responseJSON;
            var text = "<ul style='list-style: none;padding: 0;'>"
            var keys_errors = Object.keys(data.errors);

            for (var j = 0; j < keys_errors.length; j++) {
              for (var i = 0; i < data.errors[keys_errors[j]].length; i++) {
                text += "<li>" + data.errors[keys_errors[j]][i] + "</li>"
              }
            }
            text += "</ul>"
            Swal.fire(
              '¡Error!',
              'Verifique lo siguiente:<br>' + text,
              'error'
            )
          }
        },
        complete: function (xhr, status) {
          //  alert('Petición realizada');
          own.isLoadingUpdateHour=false;
          $(own.idGeneral).find('.alerts').append(Metodos.insertAlert())

        }
      });
    }
  }
}

declare var $: any;
const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;


@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string | null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(time: NgbTimeStruct | null): string | null {
    return time != null ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
  }
}


@Component({
  selector: 'app-admin-dashboard-profile',
  templateUrl: './admin-dashboard-profile.component.html',
  styleUrls: ['./admin-dashboard-profile.component.css'],
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter }]

})
export class AdminDashboardProfileComponent implements OnInit,AfterViewInit {
  public APP_URL = environment.appUrl;
  public APP_URL_API = environment.apiUrl;
  public textWhatsapp = ''
  public phoneWhatsapp = ''
  public $stores_id = '';
  public $stores_name = '';
  public $stores_latitud = '';
  public $stores_longitud = '';
  public $stores_document_type = '';
  public $stores_document = '';
  public $stores_uri = '';
  public $stores_description = '';
  public $stores_whatsapp = '';
  public $stores_collect = '';
  public $stores_coverage_description = '';
  public $stores_instagram = '';
  public $stores_facebook = '';
  public $stores_nickname = '';
  public $stores_email = '';
  public $stores_celphone = '';
  public $stores_delivery = '';
  public $stores_coverages:any[] = [];
  public $uri_count:number = 0;
  public store:Store=null;

  isLoadingProfile: boolean = false;
  isLoadingCoverage: boolean = false;
  isLoadingUpdateCoverage: boolean = false;
  isLoadingDeleteCoverage: boolean = false;

  isLoadingHour: boolean = false;
  preloadDashboard:boolean = false;
  
  public $stores_deparments:Department[]= [];
  public $filters: Select2Data=[];//
  public $filters_options: Options;

  public $stores_filters: Select2Value[] =[];
  public $caracteres_especiales = `(){}_@,/'"`;

  public provinces:Province[]= [];
  public districts:District[]= [];
  public hours:Hour[]=[];

  public idGeneral = '#STORE-DASHBOARD-PERFIL';

  timeInit: string = '04:00:00';
  timeEnd: string = '21:00:00';

  public tabs = [
    {
      title: 'dashboard-hour-content',
      component: DashboardHourContent
    }
  ];
   @ViewChild('hourContainer', { read: ViewContainerRef }) hourContainer;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,public nodeStoreService:NodeStoreService,
    private router: Router) {
      nodeStoreService.getStore().subscribe(data=>{
        this.store = data.store;
      });
    }

  ngOnInit(): void {
    Metodos.menuDashboardActive('perfil-tienda');
    this.textWhatsapp = Metodos.textWhatsapp
    this.phoneWhatsapp = Metodos.phoneWhatsapp

 

    $.getScript(this.APP_URL+'assets/javascript/tours/dashboard/dashboard-perfil-tienda-tour.js');
    //https://stackblitz.com/edit/ng-select2?file=src%2Fapp%2Fdemos%2Fmultiple%2Fmultiple.component.html

    this.$filters_options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };

  
 
  }
  ngAfterViewInit() {
    this.getAll();
  }
  eventHour($event){
    if($event==1){
      this.getHours()
    }
  }
  getCoverages() {
    let own = this;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/home/coverages',//ok

      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      data: { id: own.store.stores_id },

      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        own.$stores_coverages = data.stores_coverages;
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
  getHours() {
    let own = this;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/home/hours',//ok

      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      data: { id: own.store.stores_id },

      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {

        own.updateHourContent(own,data.hours);
      
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


  addH(self, event) {
    let own = this;

    $(own.idGeneral).find('#houraddModal').modal('show');
    $(own.idGeneral).find('form.needs-validation').removeClass('was-validated')
  }


 btnHour() {
    let own = this;
    var data: any = {}
    data.uri = own.store.stores_uri;
    data.id = own.store.stores_id;
    data.day = $(own.idGeneral).find('#houraddModal').find('select[name="day"]').val()
    data.time_start = own.timeInit;
    data.time_end = own.timeEnd;
    if (data.day == "Lunes") {
      data.acronym = "LU";
      data.position = 1;
    }
    if (data.day == "Martes") {
      data.acronym = "MA";
      data.position = 2;
    }
    if (data.day == "Miercoles") {
      data.acronym = "MI";
      data.position = 3;
    }
    if (data.day == "Jueves") {
      data.acronym = "JU";
      data.position = 4;
    }
    if (data.day == "Viernes") {
      data.acronym = "VI";
      data.position = 5;
    }
    if (data.day == "Sábado") {
      data.acronym = "SA";
      data.position = 6;
    }
    if (data.day == "Domingo") {
      data.acronym = "DO";
      data.position = 7;
    }

    if ($(own.idGeneral).find('#houraddModal').find('select[name="day"]').val() == "" ||
      $(own.idGeneral).find('#houraddModal').find('input[name="time_start"]').val() == "" ||
      $(own.idGeneral).find('#houraddModal').find('input[name="time_end"]').val() == "") {

    } else {
      own.isLoadingHour=true;
      $.ajax({
        // la URL para la petición
        url: own.APP_URL_API + 'dashboard/home/add-hour',//ok

        data: data,

        type: 'POST',
        headers: { 
          "Authorization": localStorage.getItem('accessToken')
        },
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (json) {
       //   console.log(json);

          $(own.idGeneral).find('#houraddModal').modal('hide')
          own.getHours()
        },

        error: function (xhr, status) {
          // alert('Disculpe, existió un problema');
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
          //  alert('Petición realizada');
          own.isLoadingHour=false;
          $(own.idGeneral).find('.alerts').append(Metodos.insertAlert());


        }
      });
    }

  }


  convertToSlug(self) {
    let own = this;
    setTimeout(() => {
      $(own.idGeneral).find('.disp-url').empty();
      var str = self.value;
      //replace all special characters | symbols with a space
      str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();

      // trim spaces at start and end of string
      str = str.replace(/^\s+|\s+$/gm, '');

      // replace space with dash/hyphen
      str = str.replace(/\s+/g, '-');
      
      $(own.idGeneral).find('#uri-profile').val(str);
      $(own.idGeneral).find('.URLSET').attr('data-url', str);
      //http://localhost:4200/polize-store/dashboard/perfil-tienda
      $(own.idGeneral).find('.URLSET').text(`URL: ${this.APP_URL}` + str);
      $(own.idGeneral).find('.disp-url').empty();
    }, 1000);
  }


  goURL(self, type) {
    let own = this;
    window.open(
      $(own.idGeneral).find('[name="' + type + '"]').val(),
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  goWhatssapp(self, type){
    let own = this;
    let phone =$(own.idGeneral).find('[name="' + type + '"]').val();
    window.open(
      `https://api.whatsapp.com/send?phone=${phone}&text=Hola ${own.$stores_name}`,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
  saveDespacho() {
    let own = this;
    var country_id = $(own.idGeneral).find('#cardCoverageAdd').find('select[name="countries"]').val()
    var department_id = $(own.idGeneral).find('#cardCoverageAdd').find('select[name="deparments"]').val()
    var province_id = $(own.idGeneral).find('#cardCoverageAdd').find('select[name="provinces"]').val()
    var district_id = $(own.idGeneral).find('#cardCoverageAdd').find('select[name="districts"]').val()
    var price = $(own.idGeneral).find('#cardCoverageAdd').find('input[name="price"]').val()
    var description = $(own.idGeneral).find('#cardCoverageAdd').find('textarea[name="description"]').val()

 
    if (price == '') {
      Swal.fire(
        '¡Falta ingresar el precio!',
        'Ingrese el precio correctamente',
        'warning'
      )
      return false;
    }
    if (country_id == ''||country_id==null||typeof country_id =='undefined') {
      country_id=179;
    }
    if (department_id == ''||department_id==null||typeof department_id =='undefined') {
      department_id=0;
    }
    if (province_id == ''||province_id==null||typeof province_id =='undefined') {
      province_id=0;
    }
    if (district_id == ''||district_id==null||typeof district_id =='undefined') {
      district_id=0;
    }
    var data = {
      id:own.store.stores_id,
      country_id: country_id,
      department_id: department_id,
      province_id: province_id,
      district_id: district_id,
      price: price,
      description: description,
    }

    Swal.fire({
      title: '¿Seguro de Agregar?',
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
    }).then(function (result) {

      if (result.isConfirmed) {
        own.isLoadingCoverage=true;
        $.ajax({
          url: own.APP_URL_API + 'dashboard/store/coverage',
          data: data,
          type: 'POST',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          dataType: 'json',
          success: function (data) {
            own.$stores_coverages = data.stores_coverages;
          },
  
          error: function (xhr, status) {
            $(own.idGeneral).find('.alerts').append(Metodos.noInsertAlert());
          },
          complete: function (xhr, status) {
            own.isLoadingCoverage=false;
            $(own.idGeneral).find('.alerts').append(Metodos.insertAlert());

          }
        });
      } else if (result.isDenied) {
      }
    });
    return true;
  }//editCoverage
  deleteCoverage( id) {
    let own = this;

    Swal.fire({

      title: '¿Seguro de eliminar?',
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

    }).then(function (result) {
      if (result.isConfirmed) {
        own.isLoadingDeleteCoverage=true;
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/store/coverage/'+ id+'/'+own.store.stores_id,//ok

          type: 'DELETE',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (data) {
    
            own.$stores_coverages = data.stores_coverages;
          },
          error: function (xhr, status) {
            $(own.idGeneral).find('.alerts').append(Metodos.noDeleteAlert());
          },
          complete: function (xhr, status) {
            own.isLoadingDeleteCoverage=false;
            $(own.idGeneral).find('.alerts').append(Metodos.deleteAlert());
          }
        });

      } else if (result.isDenied) {
     
      }
    })
  }
  updateStoreFilters($event){ 
    console.log($event.value);
    if($event.value.length>0){
      this.$stores_filters=$event.value;
    }else{
      this.$stores_filters=[35];
    }
  }


  saveSetting() {
    // var laddaBtn = e.currentTarget;
    //  var l = Ladda.create(laddaBtn);

    //  l.start();

    let own = this;
    var id = own.store.stores_id;// $(own.idGeneral).find('#store_id').val()
    var uri = $(own.idGeneral).find('#uri-profile').val();
    var nickname = $(own.idGeneral).find('#nickname-profile').val();
    var email = $(own.idGeneral).find('#email-profile').val();
    var celphone = $(own.idGeneral).find('#celphone-profile').val();
    var whatsapp = $(own.idGeneral).find('#whatsapp-profile').val();
    var facebook = $(own.idGeneral).find('#facebook-profile').val();
    var instagram = $(own.idGeneral).find('#instagram-profile').val();
    var youtube = $(own.idGeneral).find('#youtube-profile').val();
    var coverage = $(own.idGeneral).find('#coverage-profile').val();
    var delivery = $(own.idGeneral).find('#check-delivery').is(":checked");
    var collect = $(own.idGeneral).find('#check-collect').is(":checked");
    var description = $(own.idGeneral).find('#description-profile').val();

    if (delivery == true) {
      delivery = "SI"
    } else {
      delivery = "NO"
    }
    if (collect == true) {
      collect = "SI"
    } else {
      collect = "NO"
    }

    /*if(own.$uri_count>1){
      uri=own.store.stores_uri;
    }*/

    var data = {
      uri: uri,
      nickname: nickname,
      email: email,
      celphone: celphone,
      whatsapp: whatsapp,
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
      coverage: coverage,
      delivery: delivery,
      collect: collect,
      description: description,
      filters:own.$stores_filters,
    }
    //$stores_filters

    //console.log(data);
    Swal.fire({
      title: '¿Seguro de Actualizar?',
      text: "¡Si continuas no podras revertir los cambios!",
      icon: 'warning',
      //showDenyButton: false,
      showCancelButton: true,
      //confirmButtonText: `Save`,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, actualizar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first border-radius-15 mr-5',
        cancelButton: 'btn btn-danger-2  border-radius-15 '
      },
      buttonsStyling: false,
    }).then(function (result) {

      if (result.isConfirmed) {
        own.isLoadingProfile=true;
        $.ajax({
          // la URL para la petición
          url: own.APP_URL_API + 'dashboard/profile/'+ id,//ok
          data: data,
  
          type: 'PUT',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          // el tipo de información que se espera de respuesta
          dataType: 'json',
          // código a ejecutar si la petición es satisfactoria;
          // la respuesta es pasada como argumento a la función
          success: function (json) {
            //response
            //cantidad_url
            if (json.response == false) {
              Swal.fire(
                '¡No se ha guardado!',
                json.mensaje,
                'error'
              )

            } else {
              Swal.fire(
                'Perfil!',
                json.mensaje,
                'success'
              )
              localStorage.setItem("stores_uri",json.data.uri);
              setTimeout(function(){
                own.router.navigateByUrl('/'+json.data.uri+'/dashboard/perfil-tienda');
              },1000);
              //$(own.idGeneral).find('[name="uri"]').attr('data-url',  json.data.uri);
              //$(own.idGeneral).find('[name="uri"]').val(json.data.uri);
             
  
            }
  
  
          },
  
          error: function (xhr, status) {
            $(own.idGeneral).find('.alerts').append(Metodos.noUpdateAlert());

          },
          complete: function (xhr, status) {

            own.isLoadingProfile=false;

          }
        });
      
      } else if (result.isDenied) {
        
      }


      
    });

  }

  uriProfile(self){
    let own = this;
    if($(own.idGeneral).find('.URLSET').attr('data-url')!=own.store.stores_uri){
      $(own.idGeneral).find('.disp-url').html('<strong>Buscando ...</strong>')
      setTimeout(() => {
        $.get(own.APP_URL_API +"dashboard/url-verify/"+$('.URLSET').attr('data-url'), function(data, status){
            if(data==true){
                $(own.idGeneral).find('.disp-url').html('<strong>¡Esta disponible!</strong>')
            }else{
                $(own.idGeneral).find('.disp-url').html('<strong>¡No Esta disponible!</strong>')//'¡No Esta disponible!'
            }
        });
    }, 2100);
    }else{
      $('.disp-url').html('<strong>¡Puede seguir usando su url!</strong>')
    }
  
  }

  goURLDATA(self, type) {
    let own = this;
    window.open(
      `${own.APP_URL}${own.store.stores_uri}`,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
  public getImagePrincipal() {
    return (this.store?.stores_image == null || this.store?.stores_image == '') ? Metodos.getImageDefault100X100(this.APP_URL) : this.store?.stores_image_url;
  }
  getAll() {
    let own = this;
    Metodos.insertPreloadStoreRemoveHidden('PRELOAD-DASHBOARD-PERFIL', this.getImagePrincipal(), this.$stores_name);
    own.preloadDashboard=false;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/profile',//ok

      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      data: { id: own.store.stores_id },

      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (data) {
           

        //$(own.idGeneral).find('#HoursCardBody').empty();
            own.$stores_name=data.stores_name;
            own.$stores_nickname=data.stores_nickname;
            own.$stores_latitud=data.stores_latitud;
            own.$stores_longitud=data.stores_longitud;
            own.$stores_document_type=data.stores_document_type;
            own.$stores_document=data.stores_document;
            own.$stores_uri=data.stores_uri;
            own.$stores_email=data.stores_email;
            own.$stores_celphone=data.stores_celphone;
            own.$stores_facebook=data.stores_facebook;
            own.$stores_instagram=data.stores_instagram;
            own.$stores_delivery=data.stores_delivery;
            own.$stores_collect=data.stores_collect;
            own.$stores_whatsapp=data.stores_whatsapp;
            own.$stores_description=data.stores_description;
            own.$stores_coverage_description = data.stores_coverage;
            own.$stores_deparments=data.stores_deparments;
            own.$stores_coverages=data.stores_coverages;
            own.$uri_count = data.uri_count;

            for (var i = 0; i < own.$stores_deparments.length; i++) {
              if (i == own.$stores_deparments.length) { break; }
              own.provinces = own.$stores_deparments[0].provinces;
              own.districts = own.provinces[0].districts;
              break;
            }
            for(var i =0; i<data.filters.length;i++){
              if(i==data.filters.length){ break;}
              own.$filters.push({
                value: data.filters[i].id, 
                label: data.filters[i].name, 
                data: {  id: data.filters[i].id, name: data.filters[i].name }//color: 'white', 
              });
            }

            own.$stores_filters=data.stores_filters_ids;

            own.hours=data.hours;
            own.updateHourContent(own,data.hours);
      },

      error: function (xhr, status) {
      },
      complete: function (xhr, status) {
        own.preloadDashboard=true;
        Metodos.removeNodoPreloadHidden('PRELOAD-DASHBOARD-PERFIL');
      
        //
      }
    });
  }

  updateHourContent(own,hours){
    own.hourContainer.clear();
    if (hours.length > 0) {
      const factory: ComponentFactory<DashboardHourContent> = own.componentFactoryResolver.resolveComponentFactory(own.tabs[0].component);
      let ref = own.hourContainer.createComponent(factory)
      ref.instance.$horarios = hours;
      ref.instance.eventHour.subscribe(response => own.eventHour(response));
    }
  }

  OnChangeDepartments(value) {
   // console.log(value);
    if(value!=0){
      for (var i = 0; i < this.$stores_deparments.length; i++) {
        if (i == this.$stores_deparments.length) { break; }
        if (parseInt(value) == this.$stores_deparments[i].id) {
  
          //this.user.deparment_id = parseInt(value);
  
          this.provinces = this.$stores_deparments[i].provinces;//districts
          this.districts = this.provinces[0].districts;
          break;
        }
      }
    }else{
      let deparments:any = document.querySelector('select[name="deparments"]');
      deparments.value=0;
      let provinces:any = document.querySelector('select[name="provinces"]');
      provinces.value=0;
      let districts:any = document.querySelector('select[name="districts"]');
      districts.value=0;
    }

  }



  OnChangeProvinces(value) {
   // console.log(value);
    /*
        Swal.fire(
          'Cancelado',
          'Su Perfil no ha sido cambiado',
          'error'
        )
    
    */
   let deparments:any = document.querySelector('select[name="deparments"]');
    if(value!=0 && deparments.value!=0){
      for (var i = 0; i < this.provinces.length; i++) {
        if (i == this.provinces.length) { break; }
  
        if (parseInt(value) == this.provinces[i].id) {
          
          this.districts = this.provinces[i].districts;//districts
  
  
          //this.user.province_id = parseInt(value);
          //this.user.district_id = this.provinces[0].districts[0].id;
  
          break;
        }
      }
    }else{
      let provinces:any = document.querySelector('select[name="provinces"]');
      provinces.value=0;
      let districts:any = document.querySelector('select[name="districts"]');
      districts.value=0;   
     }


  }

  OnChangeDistricts(value) {
    let deparments:any = document.querySelector('select[name="deparments"]');
    let provinces:any = document.querySelector('select[name="provinces"]');
    let districts:any = document.querySelector('select[name="districts"]');

    //console.log(value);
    if(value!=0&& deparments.value!=0&& provinces.value!=0){

    }else{
      districts.value=0;  
    }
    //this.user.district_id = parseInt(value);

  }
  OnChangeEditDepartments(value) {
    //console.log(value);
    if(value!=0){
      for (var i = 0; i < this.$stores_deparments.length; i++) {
        if (i == this.$stores_deparments.length) { break; }
        if (parseInt(value) == this.$stores_deparments[i].id) {
  
          //this.user.deparment_id = parseInt(value);
  
          this.provinces = this.$stores_deparments[i].provinces;//districts
          this.districts = this.provinces[0].districts;
          break;
        }
      }
    }else{
      let deparments:any = document.querySelector('select[name="deparments-edit"]');
      deparments.value=0;
      let provinces:any = document.querySelector('select[name="provinces-edit"]');
      provinces.value=0;
      let districts:any = document.querySelector('select[name="districts-edit"]');
      districts.value=0;
    }

  }



  OnChangeEditProvinces(value) {
  //  console.log(value);
    /*
        Swal.fire(
          'Cancelado',
          'Su Perfil no ha sido cambiado',
          'error'
        )
    
    */
   let deparments:any = document.querySelector('select[name="deparments-edit"]');
    if(value!=0 && deparments.value!=0){
      for (var i = 0; i < this.provinces.length; i++) {
        if (i == this.provinces.length) { break; }
  
        if (parseInt(value) == this.provinces[i].id) {
          
          this.districts = this.provinces[i].districts;//districts
  
  
          //this.user.province_id = parseInt(value);
          //this.user.district_id = this.provinces[0].districts[0].id;
  
          break;
        }
      }
    }else{
      let provinces:any = document.querySelector('select[name="provinces-edit"]');
      provinces.value=0;
      let districts:any = document.querySelector('select[name="districts-edit"]');
      districts.value=0;   
     }


  }

  OnChangeEditDistricts(value) {
    let deparments:any = document.querySelector('select[name="deparments-edit"]');
    let provinces:any = document.querySelector('select[name="provinces-edit"]');
    let districts:any = document.querySelector('select[name="districts-edit"]');

   // console.log(value);
    if(value!=0&& deparments.value!=0&& provinces.value!=0){

    }else{
      districts.value=0;  
    }
  }
  editCoverage(id){
    let own=this;
    $(own.idGeneral).find('#CoverturaModal').modal('show');
    let coverage_id:any = document.querySelector('input[name="coverage-edit"]');

    let deparments:any = document.querySelector('select[name="deparments-edit"]');
    let provinces:any = document.querySelector('select[name="provinces-edit"]');
    let districts:any = document.querySelector('select[name="districts-edit"]');
    let price:any = document.querySelector('input[name="price-edit"]');
    let description:any = document.querySelector('textarea[name="description-edit"]');

    deparments.value=0;
    provinces.value=0;
    districts.value=0;
    price.value='';
    description.value='';
    own.isLoadingUpdateCoverage=true;
    $.ajax({
      url: own.APP_URL_API + 'dashboard/home/coverage/id',
      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      data: { id: id },
      dataType: 'json',
      success: function (response) {
        let array =response.data;
        if(array.length>0){
          let data =array[0];
        
            for (var i = 0; i < own.$stores_deparments.length; i++) {
              if (i == own.$stores_deparments.length) { break; }
              if(own.$stores_deparments[i].id==data.department_id){
                own.provinces = own.$stores_deparments[i].provinces;
                break;
              }
            }
         

          for (var j = 0; j < own.provinces.length; j++) {
            if (j == own.provinces.length) { break; }
            if(own.provinces[j].id==data.province_id){
              own.districts = own.provinces[j].districts;
              break;
            }
          }
        
          for (var y = 0; y < own.districts.length; y++) {
            if (y == own.districts.length) { break; }

            if(own.districts[y].id==data.district_id){
              break;
            }
          }
        
          price.value= data.price;
          description.value= data.description;
          coverage_id.value= data.id;


          setTimeout(() => {
            $(own.idGeneral).find('select[name="deparments-edit"]').val((data.department_id==null||data.department_id==''||data.department_id==0)?0:data.department_id)

            $(own.idGeneral).find('select[name="provinces-edit"]').val((data.province_id==null||data.province_id==''||data.province_id==0)?0:data.province_id)
            $(own.idGeneral).find('select[name="districts-edit"]').val((data.district_id==null||data.district_id==''||data.district_id==0)?0:data.district_id)
          }, 1000);
        }
      },

      error: function (xhr, status) {
      },
      complete: function (xhr, status) {
        own.isLoadingUpdateCoverage=false;
      }
    });


  }

  editDespacho(){
    let own = this;
    let id:any = $(own.idGeneral).find('input[name="coverage-edit"]').val()
    var country_id = $(own.idGeneral).find('select[name="countries-edit"]').val()
    var department_id = $(own.idGeneral).find('select[name="deparments-edit"]').val()
    var province_id = $(own.idGeneral).find('select[name="provinces-edit"]').val()
    var district_id = $(own.idGeneral).find('select[name="districts-edit"]').val()
    var price = $(own.idGeneral).find('input[name="price-edit"]').val()
    var description = $(own.idGeneral).find('textarea[name="description-edit"]').val()
 
    if (price == '') {
       Swal.fire(
        '¡Falta ingresar el precio!',
        'Ingrese el precio correctamente',
        'warning'
      )
      return false;
    }
    if (country_id == ''||country_id==null||typeof country_id =='undefined') {
      country_id=179;
    }
    if (department_id == ''||department_id==null||typeof department_id =='undefined') {
      department_id=0;
    }
    if (province_id == ''||province_id==null||typeof province_id =='undefined') {
      province_id=0;
    }
    if (district_id == ''||district_id==null||typeof district_id =='undefined') {
      district_id=0;
    }
    var data = {
      store_id:own.store.stores_id,
      id:id,
      country_id: country_id,
      department_id: department_id,
      province_id: province_id,
      district_id: district_id,
      price: price,
      description: description,
    }

    Swal.fire({
      title: '¿Seguro de Actualizar?',
      text: "¡Si continuas no podras revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: '¡Si, actualizar!',
      cancelButtonText: '¡No, cancelar!',
      customClass: {
        confirmButton: 'btn btn-first border-radius-15 mr-5',
        cancelButton: 'btn btn-danger-2  border-radius-15 '
      },
      buttonsStyling: false,
    }).then(function (result) {

      if (result.isConfirmed) {
        own.isLoadingUpdateCoverage=true;
        $.ajax({
          url: own.APP_URL_API + 'dashboard/home/coverage/edit',
          data: data,
          type: 'put',
          headers: { 
            "Authorization": localStorage.getItem('accessToken')
          },
          dataType: 'json',
          success: function (data) {
            own.$stores_coverages = data.stores_coverages;
           
            $(own.idGeneral).find('input[name="price-edit"]').val('');
            $(own.idGeneral).find('textarea[name="description-edit"]').val('');
             $(own.idGeneral).find('#CoverturaModal').modal('hide');
           
          },
          error: function (xhr, status) {
            $(own.idGeneral).find('.alerts').append(Metodos.noUpdateAlert());
          },
          complete: function (xhr, status) {
            own.isLoadingUpdateCoverage=false;
            $(own.idGeneral).find('.alerts').append(Metodos.updateAlert());

          }
        });
      } else if (result.isDenied) {
      }
    });
    return true;
  }

}


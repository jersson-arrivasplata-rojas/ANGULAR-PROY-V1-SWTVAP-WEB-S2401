import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import * as moment from 'moment'; // add this 1 of 4
import { Metodos } from 'src/Utils/Metodos';
import { Store } from 'src/app/interfaces/store';
import { NodeStoreService } from 'src/app/services/node-store.service';
import { environment } from 'src/environments/environment';

declare var $: any;
let stores_uri = '';
let stores_id = '';

@Component({
  selector: 'app-admin-dashboard-clients',
  templateUrl: './admin-dashboard-clients.component.html',
  styleUrls: ['./admin-dashboard-clients.component.css']
})
export class AdminDashboardClientsComponent implements OnInit {
  public APP_URL = environment.appUrl;
  public APP_URL_API = environment.apiUrl;
  public idGeneral = '#STORE-DASHBOARD-CLIENTES';
  $clients: any[] = [];

  public $stores_uri: string;
  store:Store=null;
  constructor(public nodeStoreService: NodeStoreService) {
    nodeStoreService.getStore().subscribe(data => {
        this.store = data.store;
    });
  }

  ngOnInit(): void {
    Metodos.menuDashboardActive('clientes');
    $.getScript(this.APP_URL+'assets/javascript/tours/dashboard/dashboard-clientes-tour.js');
    //stores_uri = location.pathname.split('/')[1];
    //this.$stores_uri = stores_uri;

    this.getClients();
  }

  entreFechas(data) {
    //let now = moment();

    var date = new Date();
    var ini: any = (new Date(date.getFullYear(), date.getMonth(), 1)).toString();
    var fin = (new Date(date.getFullYear(), date.getMonth() + 1, 1)).toString();
    //    var fin = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).toString();

    var fechas = []
    var mounts = []
    if (ini != undefined && fin != undefined) {

      while (true) { //while (ini.isSameOrBefore(fin)) {
        var mount = 0;
        data.find(element => {
          if (element.day == moment(ini).format('YYYY-MM-DD')) {
            mount = element.amount_total;
          }
        });

        fechas.push(moment(ini).format('YYYY-MM-DD'))
        mounts.push(mount)
        ini = moment(ini).add(1, 'days');
        if ((ini['_d']).toString() == fin) {
          //fechas.push(moment(ini).format('YYYY-MM-DD'))
          break;
        }
      }


    }
    return [fechas, mounts];
  }
  public chartOption: EChartOption;

  public myChart: any;
  modalHistory(self, id) {
    let own = this;
    $(own.idGeneral).find('#showModal').modal('show');
    ///$('#historyModal').modal('show')
    $.ajax({
      // la URL para la petición
      //url: '../userapps/' + id + '/editUserHistory',
      url: own.APP_URL_API + 'dashboard/clients/' + id,//ok
      //url: '../userapps/' + id + '/editUserHistory',
      data: { store_id: own.store.stores_id },

      type: 'GET',
      headers: { 
        "Authorization": localStorage.getItem('accessToken')
      },
      // el tipo de información que se espera de respuesta
      dataType: 'json',
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success: function (response) {
        console.log(response)
        var data = [];
        $('#Details').find('li').eq(0).text('Cantidad de Ordenes Realizadas: ' + response.count_orders)
        $('#Details').find('li').eq(1).text('Ganancia total obtenida: S/' + response.amount_total)
        console.log(response.amount_total_diary)

        /*for (let index = 0; index < response.amount_total_diary.length; index++) {
             let element = response.amount_total_diary[index];
             for (let indexj = 0; indexj < response.amount_total_diary.length; indexj++) {
                 let elementj = response.amount_total_diary[indexj];
                 if(){

                 }
             }
         }*/

        var entreF = own.entreFechas(response.amount_total_diary)


        own.chartOption = {
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              animation: true
            }
          },
          grid: {
            top: '10%',
            left: '40',
            right: '40',
            bottom: '40'
          },
          xAxis: {
            type: 'category',
            data: entreF[0],
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true
            }
          },
          series: [{
            data: entreF[1],
            type: 'line',
            showSymbol: true,
            smooth: true,
            color: '#639',
            lineStyle: {
              opacity: 1,
              width: 2
            }
          }]
        };

        /* setTimeout(function() {
             own.myChart = echarts.init(document.getElementById('amount_total'), 'vintage', {
                 width: $('#historyModal').find('.panel').eq(0).width() - 50,
                 height: 250
             });
            
             myChart.setOption(option);
         }, 500)*/
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

  getClients() {
    let own = this;
    $.ajax({
      // la URL para la petición
      url: own.APP_URL_API + 'dashboard/clients',//ok

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

        own.$clients = data.clients;

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
}

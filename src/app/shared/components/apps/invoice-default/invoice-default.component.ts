import { Component, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { ResourcesUtils } from 'src/app/shared/utils/resources.utils';

@Component({
  selector: 'swtvap-invoice-default',
  templateUrl: './invoice-default.component.html',
  styleUrls: ['./invoice-default.component.scss']
})
export class InvoiceDefaultComponent implements OnInit {
  public ImprimirFactura:string;
  public PedidoInformacion:string;
  public PedidoEstado:string;
  public PedidoFecha:string;
  public Factura:string;
  public Editar:string;
  public Entregado:string;
  public NumeroOrden:string;
  public Guardar:string;
  public Procesando:string;
  public Pendiente:string;
  public FacturaDe:string;
  public FacturaHacia:string;
  public Eliminar:string;
  public AgregarItem:string;



  constructor() {

   }

  ngOnInit(): void {
    switch (CommonUtils.getPortalId()) {
      case 1:
        this.ImprimirFactura  = ResourcesUtils.EsImprimirFactura;
        this.PedidoInformacion  = ResourcesUtils.EsPedidoInformacion;
        this.PedidoEstado  = ResourcesUtils.EsPedidoEstado;
        this.PedidoFecha  = ResourcesUtils.EsPedidoFecha;
        this.Factura  = ResourcesUtils.EsFactura;
        this.Editar  = ResourcesUtils.EsEditar;
        this.Entregado  = ResourcesUtils.EsEntregado;
        this.NumeroOrden = ResourcesUtils.EsNumeroOrden;
        this.Guardar = ResourcesUtils.EsGuardar;
        this.Procesando = ResourcesUtils.EsProcesando;
        this.Pendiente = ResourcesUtils.EsPendiente;
        this.FacturaDe = ResourcesUtils.EsFacturaDe;
        this.FacturaHacia = ResourcesUtils.EsFacturaHacia;
        this.Eliminar = ResourcesUtils.EsEliminar;
        this.AgregarItem = ResourcesUtils.EsAgregarItem;



        break;
    }

  }

}
// file:///C:/My%20Web%20Sites/02/demos.ui-lib.com/gull/html/layout1/tables.html
// file:///C:/My%20Web%20Sites/02/demos.ui-lib.com/gull/html/layout1/nouislider.html

//file:///C:/My%20Web%20Sites/02/demos.ui-lib.com/gull/html/layout1/upload.html

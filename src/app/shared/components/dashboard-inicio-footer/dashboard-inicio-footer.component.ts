import { Component, OnInit } from '@angular/core';
import { ResourcesUtils } from 'src/app/shared/utils/resources.utils';
import { CommonUtils } from '../../utils/common.utils';

@Component({
  selector: 'app-dashboard-inicio-footer',
  templateUrl: './dashboard-inicio-footer.component.html',
  styleUrls: ['./dashboard-inicio-footer.component.scss']
})
export class DashboardInicioFooterComponent implements OnInit {
  public Copyright: string;
  public DerechosReservados: string;
  public FooterTitulo: string;
  public FooterDescripcion: string;
  public UrlWebDevInnovaPeru: string;
  public WebDevInnovaPeru: string;
  public Facebook: string;


  constructor() { }

  ngOnInit(): void {
    switch (CommonUtils.getPortalId()) {
      case 1:
        this.Copyright = ResourcesUtils.EsCopyright;
        this.DerechosReservados = ResourcesUtils.EsDerechosReservados;
        this.FooterTitulo = ResourcesUtils.EsFooterTitulo;
        this.FooterDescripcion = ResourcesUtils.EsFooterDescripcion;
        this.UrlWebDevInnovaPeru = ResourcesUtils.EsUrlWebDevInnovaPeru;
        this.WebDevInnovaPeru = ResourcesUtils.EsWebDevInnovaPeru;
        this.Facebook = ResourcesUtils.EsFacebook;
        break;
    }
  }

}

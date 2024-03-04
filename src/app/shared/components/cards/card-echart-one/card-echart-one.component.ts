import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { EChartOption } from 'echarts';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { ResourcesUtils } from 'src/app/shared/utils/resources.utils';

@Component({
  selector: 'swtvap-card-echart-one',
  templateUrl: './card-echart-one.component.html',
  styleUrls: ['./card-echart-one.component.scss']
})
export class CardEchartOneComponent implements OnInit {
  public isBrowser: boolean;
  public isServer: boolean;
  @Input() total: string;
  constructor(@Inject(PLATFORM_ID) private platformId) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  public Venta20UltimosDias: string;
  public chartOption: EChartOption;


  ngOnInit(): void {
    if (this.isBrowser) {
      switch (CommonUtils.getPortalId()) {
        case 1:

          this.Venta20UltimosDias = ResourcesUtils.EsVenta20UltimosDias;
      }
//formatter: '{a} <br/>{b} : {c} ({d}%)'
      this.chartOption = {

        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} : S/{c}'
        },
        markArea: {
          label: {
            show: true
          }
        },
        areaStyle: {
          color: 'rgba(102, 51, 153, .2)',
          origin: 'start'
        },
        lineStyle: {
          color: '#663399'
        },
        itemStyle: {
          color: '#663399'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          },
        ]
      };
    }
  }

}
//https://echarts.apache.org/examples/en/editor.html?c=line-smooth
/*
onChartInit(ec) {
  this.echartsInstance = ec;
}

resizeChart() {
  if (this.echartsInstance) {
    this.echartsInstance.resize();
  }
}*/

/// https://github.com/akveo/ngx-admin/blob/master/src/app/pages/e-commerce/earning-card/front-side/earning-live-update-chart.component.ts
/*
,

      smoothLine: {
        markArea: {
          label: {
            show: true
          }
        },
        areaStyle: {
          color: 'rgba(102, 51, 153, .2)',
          origin: 'start'
        },
        lineStyle: {
          color: '#663399'
        },
        itemStyle: {
          color: '#663399'
        }
      },
      series: [
        {
          data: [30, 40, 20, 50, 40, 80, 90]
        },
      ],
*/

import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

declare var $: any;

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  ngOnInit() {
    const dataSales = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [
         [287, 385, 490, 562, 594, 626, 698],
        [ 152, 193, 240, 387, 435, 535, 642],
        [ 113, 67, 108, 190, 239, 307, 410]
      ]
    };

    const optionsSales = {
      low: 0,
      high: 1000,
      showArea: false,
      height: "290px",
      axisX: {
        showGrid: true,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: true,
      showPoint: true,
    };

    const responsiveSales = [
      ['screen and (max-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);

  }
}

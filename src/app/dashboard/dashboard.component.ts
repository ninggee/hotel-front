import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { RoomService } from '../room/room.service';
import { OrderService } from '../order/order.service';
import { VisitorService } from '../visitor/visitor.service';


declare var $: any;

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  room_available: number;
  room_all: number;
  order_number: number;
  visitor_number: number;

  constructor(private RoomService: RoomService,
              private orderService: OrderService,
          private visitorService: VisitorService) {

  }
  ngOnInit() {
    const dataSales = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [
         [287, 385, 490, 562, 594, 626, 698],
        [ 152, 193, 240, 387, 435, 535, 642],
        [ 113, 67, 108, 190, 239, 307, 410]
      ]
    };

    this.RoomService.getRemain().then(res => {
       if (res.status) {
          this.room_all = res.result.total;
          this.room_available = res.result.remain;
       }
    });

    this.orderService.getOrderNumber().then(res => {
      if (res.status) {

        this.order_number = parseInt(res.result, 10);
      }
    });

    this.visitorService.getVisitorNumber().then(res => {
      if (res.status) {
        this.visitor_number = parseInt(res.result, 10);
      }
    });



    const optionsSales = {
      low: 0,
      high: 20,
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

    this.RoomService.getStatistics().then(res => {
      if (res.status) {
        dataSales.labels = res.result.week;
        dataSales.series = [res.result.data];
        optionsSales.high = res.result.total;

        Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
      }
    });

  }
}

import {Component, OnInit} from '@angular/core';
import {Order} from './order';
import {OrderService} from './order.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-heroes',
  templateUrl: './order.component.html',
  styleUrls: [ './order.component.css' ]
})
export class OrdersComponent implements OnInit {
  title = 'Tour of Heroes';
  orders: Order[];
  selectedOrder: Order;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  getOrders(): void {
    this.orderService.getOrders().then(orders => this.orders = orders);
  }

  onSelect(order: Order): void {
    this.selectedOrder = order;
  }

  ngOnInit(): void {
    this.getOrders();
  }

/*  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }*/
}

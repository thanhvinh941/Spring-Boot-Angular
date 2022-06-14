import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-cart-detail-component',
  templateUrl: './cart-detail-component.component.html',
  styleUrls: ['./cart-detail-component.component.css']
})
export class CartDetailComponentComponent implements OnInit {

  cartItems : CartItem[] = [];
  totalPrice : number = 0;
  totalQuantity : number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.listCartDetail();
  }

  listCartDetail() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem : CartItem){
    this.cartService.addToCart(theCartItem);
  }
}

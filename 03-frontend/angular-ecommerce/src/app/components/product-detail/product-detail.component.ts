import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product : Product = new Product();

  constructor(private productService : ProductService,
              private CartService : CartService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetail();
    });
  }

  handleProductDetail(){
    const theProductId : number = +Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(theProductId).subscribe(
      data=>{
        this.product = data;
      }
    );
  }

  addToCart(){
    const theCartItem = new CartItem(this.product);
    this.CartService.addToCart(theCartItem);
  }

}

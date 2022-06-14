import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  currentCategoryId : number = 1;
  previousCategoryId: number = 1;
  searchMode : boolean = false;

  thePageNumber : number = 1;
  thePageSize : number = 10;
  theTotalElements : number = 0;

  previousKeyword: string = "";

  constructor(private productService : ProductService,
              private CartService : CartService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProduct();
    }else{
      this.handleListProduct();
    }
  }

  handleListProduct(){
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId = +Number(this.route.snapshot.paramMap.get('id'));
    }else{
      this.currentCategoryId = 1;
    }

    
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    
    this.productService.getProductListPaginate(
      this.thePageNumber - 1, 
      this.thePageSize,
      this.currentCategoryId).
      subscribe(this.processResult());
  }

  handleSearchProduct(){
    const theKeyword : string = String(this.route.snapshot.paramMap.get('keyword'));

    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.productService.searchProductPaginate( this.thePageNumber - 1, 
      this.thePageSize,theKeyword).subscribe(
      this.processResult()
    )
  }

  processResult(){
    return (data: {
      _embedded: { products: Product[]; }; 
      page: { number: number; size: number; totalElements: number; }; 
      }) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize =  data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  updatePageSize(pageSize : number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct : Product){
    const theCartItem = new CartItem(theProduct);
    this.CartService.addToCart(theCartItem);
  }
}

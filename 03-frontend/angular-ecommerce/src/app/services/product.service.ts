import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrlProduct = 'http://localhost:8080/api/products';
  private baseUrlProductCategory = 'http://localhost:8080/api/product_category';
  constructor(private httpClient : HttpClient) { }

  getProductListPaginate(thePage : number,
                         thePageSize : number,
                         theCategoryId : number) : Observable<GetResponseProduct>{

    const searchUrl = `${this.baseUrlProduct}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProductList(theCategoryId : number) : Observable<Product[]>{

    const searchUrl = `${this.baseUrlProduct}/search/findByCategoryId?id=${theCategoryId}`

    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  
  searchProductPaginate(thePage : number,
                        thePageSize : number,
                        theKeyword : string) : Observable<GetResponseProduct>{
    const searchUrl = `${this.baseUrlProduct}/search/findByNameContaining?name=${theKeyword}`
    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  searchProduct(theKeyword : string) : Observable<Product[]>{
    const searchUrl = `${this.baseUrlProduct}/search/findByNameContaining?name=${theKeyword}`

    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategoryList() : Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.baseUrlProductCategory).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProduct(theProductId : number) : Observable<Product>{

    const productUrl = `${this.baseUrlProduct}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponseProduct {
  _embedded : {
    products : Product[];
  }

  page: {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

interface GetResponseProductCategory{
  _embedded : {
    productCategory : ProductCategory[];
  }
}
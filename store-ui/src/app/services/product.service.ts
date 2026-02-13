import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = '/api/products';
  private categoryUrl = '/api/product-category';
  
  constructor(private httpClient: HttpClient) { }

  //Product list componentte çağırıyoruz
  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  createProduct(product: any): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product);
  }

  updateProduct(id: number, product: any): Observable<Product> {
    return this.httpClient.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  getCategoryUrl(): string {
    return this.categoryUrl;
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    const keyword = encodeURIComponent(theKeyword.trim());
    const searchUrl = `${this.baseUrl}/search/findByNameContainingIgnoreCase?name=${keyword}`;

    return this.getProducts(searchUrl);
  }

  getProduct(theProductId: number): Observable<Product> {
    
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }


  //page ve size parametreleri ile sayfalama sağlanıyor, yani veriler küçük parçalara bölünüyor.
  getProductListPaginate(thePage: number, thePageSize: number, 
                          theCategoryId: number): Observable<GetResponse> {
    
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponse>(searchUrl);
  }

  searchProductsPaginate(thePage: number, 
    thePageSize: number, 
    theKeyword: string): Observable<GetResponse> {

      //bir REST API endpoint’ine yapılacak GET isteğinin URL’i
    const keyword = encodeURIComponent(theKeyword.trim());
    const searchUrl = `${this.baseUrl}/search/findByNameContainingIgnoreCase?name=${keyword}`
      + `&page=${thePage}&size=${thePageSize}`;

      return this.httpClient.get<GetResponse>(searchUrl);
  }

}

interface GetResponse {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}


interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

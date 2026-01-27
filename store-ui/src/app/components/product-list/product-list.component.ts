import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterModule, CommonModule,NgbModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number = 1; //ilk gösterilecek kategori
  searchMode: boolean = false;

  previousCategoryId: number = 1;
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  previousKeyword: string = "";

  constructor(private productService: ProductService, 
            private cartService: CartService,
    private route: ActivatedRoute){ //aktif olan route hakkında bilgi almak

  }

  ngOnInit() { //Angular bileşen yüklendiğinde otomatik olarak çalışan yaşam döngüsü (lifecycle) metodu
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }else {
      this.handleListProducts();
    }
  }

  handleSearchProducts(){

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword
    ).subscribe(
      this.processResult()
    )
  }

  handleListProducts(){

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }else {
      this.currentCategoryId = 1;
    }

    if(this.previousCategoryId != this.currentCategoryId){

      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber -1, this.thePageSize,
                                      this.currentCategoryId).subscribe(
                                        this.processResult()
    )
  }

  updatePageSize(pageSize: string){
    this.thePageSize = +pageSize;
    this.thePageNumber =1;
    this.listProducts();
  }

  processResult() {  //Bu metod, gelen veriyi işleyerek bileşenin durumunu günceller
    return (data: any) => {
       console.log('Gelen veri:', data); 
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1; //Spring Data REST sayfa numaralandırmasını 0 tabanlı (zero-based) yapar.
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(theProduct: Product){

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }
}

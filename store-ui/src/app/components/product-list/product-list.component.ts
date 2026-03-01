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
  imports: [RouterModule, CommonModule, NgbModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId = 1;
  searchMode = false;

  previousCategoryId = 1;
  thePageNumber = 1;
  thePageSize = 50;
  theTotalElements = 0;
  previousKeyword = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts(): void {
    const theKeyword = this.route.snapshot.paramMap.get('keyword') ?? '';

    if (this.previousKeyword !== theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.productService
      .searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword)
      .subscribe(this.processResult());
  }

  handleListProducts(): void {
    const hasCategoryId = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +(this.route.snapshot.paramMap.get('id') ?? '1');

      if (this.previousCategoryId !== this.currentCategoryId) {
        this.thePageNumber = 1;
      }

      this.previousCategoryId = this.currentCategoryId;

      this.productService
        .getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId)
        .subscribe(this.processResult());
      return;
    }

    this.productService
      .getAllProductsPaginate(this.thePageNumber - 1, this.thePageSize)
      .subscribe(this.processResult());
  }

  updatePageSize(pageSize: string): void {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(theProduct: Product): void {
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}

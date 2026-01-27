import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductCategory } from '../../common/product-category';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];
  categories: ProductCategory[] = [];
  searchTerm = '';

  form = {
    id: null as number | null,
    name: '',
    description: '',
    unitPrice: null as number | null,
    imageUrl: '',
    active: true,
    unitsInStock: null as number | null,
    categoryId: null as number | null
  };

  notice = '';
  noticeType: 'success' | 'error' | '' = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  get filteredProducts(): any[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.products;
    }
    return this.products.filter((p) =>
      (p.name || '').toLowerCase().includes(term)
    );
  }

  get isFormValid(): boolean {
    return !!(
      this.form.name &&
      this.form.unitPrice !== null &&
      this.form.unitsInStock !== null &&
      this.form.categoryId
    );
  }

  loadCategories(): void {
    this.productService.getProductCategories().subscribe({
      next: (data) => this.categories = data,
      error: () => this.showNotice('Kategoriler yüklenemedi.', 'error')
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: () => this.showNotice('Ürünler yüklenemedi.', 'error')
    });
  }

  save(): void {
    if (!this.form.name || !this.form.unitPrice || !this.form.unitsInStock || !this.form.categoryId) {
      this.showNotice('Lütfen tüm zorunlu alanları doldurun.', 'error');
      return;
    }

    const payload: any = {
      name: this.form.name,
      description: this.form.description,
      unitPrice: this.form.unitPrice,
      imageUrl: this.form.imageUrl,
      active: this.form.active,
      unitsInStock: this.form.unitsInStock,
      category: `${this.productService.getCategoryUrl()}/${this.form.categoryId}`
    };

    const request = this.form.id
      ? this.productService.updateProduct(this.form.id, payload)
      : this.productService.createProduct(payload);

    request.subscribe({
      next: () => {
        this.showNotice(this.form.id ? 'Ürün güncellendi.' : 'Ürün eklendi.', 'success');
        this.resetForm();
        this.loadProducts();
      },
      error: () => this.showNotice('Kaydetme başarısız.', 'error')
    });
  }

  edit(product: any): void {
    this.form.id = product.id ?? null;
    this.form.name = product.name ?? '';
    this.form.description = product.description ?? '';
    this.form.unitPrice = product.unitPrice ?? null;
    this.form.imageUrl = product.imageUrl ?? '';
    this.form.active = product.active ?? true;
    this.form.unitsInStock = product.unitsInStock ?? null;
    this.form.categoryId = this.extractCategoryId(product);
  }

  remove(product: any): void {
    if (!product?.id) {
      return;
    }
    const ok = confirm('Ürünü silmek istediğinizden emin misiniz?');
    if (!ok) {
      return;
    }
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.showNotice('Ürün silindi.', 'success');
        this.loadProducts();
      },
      error: () => this.showNotice('Silme başarısız.', 'error')
    });
  }

  updateStock(product: any): void {
    if (!product?.id) {
      return;
    }
    const units = Number(product.unitsInStock);
    if (!Number.isFinite(units) || units < 0) {
      this.showNotice('Stok 0 veya daha büyük olmalıdır.', 'error');
      return;
    }

    const categoryId = this.extractCategoryId(product);
    const categoryLink = categoryId
      ? `${this.productService.getCategoryUrl()}/${categoryId}`
      : product?.category;

    const payload: any = {
      name: product.name,
      description: product.description,
      unitPrice: product.unitPrice,
      imageUrl: product.imageUrl,
      active: product.active ?? true,
      unitsInStock: units
    };

    if (categoryLink) {
      payload.category = categoryLink;
    }

    this.productService.updateProduct(product.id, payload).subscribe({
      next: () => {
        this.showNotice('Stok güncellendi.', 'success');
        this.loadProducts();
      },
      error: () => this.showNotice('Stok güncellenemedi.', 'error')
    });
  }

  resetForm(): void {
    this.form = {
      id: null,
      name: '',
      description: '',
      unitPrice: null,
      imageUrl: '',
      active: true,
      unitsInStock: null,
      categoryId: null
    };
  }

  private extractCategoryId(product: any): number | null {
    const href = product?._links?.category?.href || '';
    const match = href.match(/product-category\/(\d+)/);
    return match ? Number(match[1]) : null;
  }

  private showNotice(message: string, type: 'success' | 'error'): void {
    this.notice = message;
    this.noticeType = type;
    setTimeout(() => {
      this.notice = '';
      this.noticeType = '';
    }, 3000);
  }
}

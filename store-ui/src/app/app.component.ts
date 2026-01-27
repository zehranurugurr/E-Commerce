import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from './services/product.service';
import { FormService } from './services/form.service';
import { CheckoutService } from './services/checkout.service';
import { AuthService } from './services/auth.service';

import { SearchComponent } from './components/search/search.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    HttpClientModule,
    NgbModule,
    SearchComponent,
    CartStatusComponent,
    ProductCategoryMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ProductService, FormService, CheckoutService]
})
export class AppComponent {
  title = 'store-ui';
  profileOpen = false;

  constructor(public authService: AuthService, private router: Router) {}

  get displayName(): string {
    if (!this.authService.isLoggedIn()) {
      return 'Misafir';
    }
    const email = this.authService.getEmail() ?? '';
    return email ? email.split('@')[0] : 'Kullanıcı';
  }

  get roleLabel(): string {
    if (!this.authService.isLoggedIn()) {
      return '';
    }
    return this.authService.getRole() || 'USER';
  }

  get avatarInitials(): string {
    const name = this.displayName.trim();
    if (!name) return 'U';
    const parts = name.split(/[.\s_-]+/).filter(Boolean);
    const first = parts[0]?.[0] ?? 'U';
    const second = parts[1]?.[0] ?? '';
    return (first + second).toUpperCase();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get isAdmin(): boolean {
    return this.authService.isLoggedIn() && this.authService.getRole() === 'ADMIN';
  }

  toggleProfile(): void {
    this.profileOpen = !this.profileOpen;
  }

  closeProfile(): void {
    this.profileOpen = false;
  }
}

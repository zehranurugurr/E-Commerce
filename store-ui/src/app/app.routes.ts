import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { AdminProductsComponent } from './components/admin/admin-products.component';
import { authGuard } from './guards/auth.guard';
import { AccountComponent } from './components/account/account.component';

//Angular'da uygulama içi sayfalar arasında gezinmeyi sağlayan Routes dizisi
export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'account', component: AccountComponent, canActivate: [authGuard]},
    {path: 'admin/products', component: AdminProductsComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] }},
    {path: 'cart-details', component: CartDetailsComponent, canActivate: [authGuard], data: { roles: ['USER'] }},
    {path: 'checkout', component: CheckoutComponent, canActivate: [authGuard], data: { roles: ['USER'] }},
    {path: 'products/:id', component: ProductDetailsComponent},
    {path: 'search/:keyword', component: ProductListComponent},
    {path: 'category/:id', component: ProductListComponent},
    {path: 'category', component: ProductListComponent},
    {path: 'products', component: ProductListComponent},
    {path: '', redirectTo: '/home',  pathMatch: 'full'}, //boş URL'ler için yönlendirme, uygulama açıldığında ana sayfaya yönlendirir
    {path: '**', redirectTo: '/home',  pathMatch: 'full'} //geçersiz URL'ler için yönlendirme, tüm yolları yakalar ve ana sayfaya yönlendirir
];
 

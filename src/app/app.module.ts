import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { StockOrdersComponent } from './components/stock-orders/stock-orders.component';
import { AdminComponent } from './components/admin/admin.component';
import { OrderStockComponent } from './components/order-stock/order-stock.component';
import { ReportComponent } from './components/report/report.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    InventoryComponent,
    PageNotFoundComponent,
    HomeComponent,
    StockOrdersComponent,
    AdminComponent,
    OrderStockComponent,
    ReportComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

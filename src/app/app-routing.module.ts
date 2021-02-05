import { ReportComponent } from './components/report/report.component';
import { AuthguardService } from './services/authguard.service';
import { OrderStockComponent } from './components/order-stock/order-stock.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StockOrdersComponent } from './components/stock-orders/stock-orders.component';
import { ProductsComponent } from './components/products/products.component'
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'inventory',
    component: InventoryComponent,
  },
  {
    path: 'stock-orders',
    component: StockOrdersComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path:'order',
    component:OrderStockComponent,
    canActivate:[AuthguardService]
  },
  {
    path:'report',
    component:ReportComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { DashboardComponent } from './dashboard/dashboard.component';
import { BaseComponent } from './shared/base/base.component';
import { Error404Component } from './error404/error404.component';
import { SalesReportComponent } from './reports/sales-report/sales-report.component';

const routes: Routes = [{
  path: '',
  component: BaseComponent,
  children: [
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'products',
      loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
    },
    {
      path: 'clients',
      loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
    },
    {
      path: 'sales',
      loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
    },
    {
      path: 'reports/sales',
      component: SalesReportComponent
    },
    {
      path: '**',
      pathMatch: 'full',
      component: Error404Component
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

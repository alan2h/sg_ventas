import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { DashboardComponent } from './dashboard/dashboard.component';
import { BaseComponent } from './shared/base/base.component';
import { Error404Component } from './error404/error404.component';
import { SalesReportComponent } from './reports/sales-report/sales-report.component';
import { AuthGuardGuard } from '../auth/auth-guard.guard';

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
      canActivate: [AuthGuardGuard],
      loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
    },
    {
      path: 'clients',
      canActivate: [AuthGuardGuard],
      loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
    },
    {
      path: 'sales',
      canActivate: [AuthGuardGuard],
      loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
    },
    {
      path: 'reports/sales',
      canActivate: [AuthGuardGuard],
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { DashboardComponent } from './dashboard/dashboard.component';
import { BaseComponent } from './shared/base/base.component';

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
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { CreateComponent } from 'src/app/pages/sales/create/create.component';
import { InvoiceComponent } from 'src/app/pages/sales/invoice/invoice.component';


const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'create',
      component: CreateComponent
    },
    {
      path: 'invoice/:id',
      component: InvoiceComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }

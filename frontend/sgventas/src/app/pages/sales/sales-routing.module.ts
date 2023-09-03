import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { CreateComponent } from 'src/app/pages/sales/create/create.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'create',
      component: CreateComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }

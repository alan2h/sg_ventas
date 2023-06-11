import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';



const routes: Routes = [{
  path: '',
  children: [
    {
        path: 'list',
        component: ListComponent
    },
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
export class PagesRoutingModule { }

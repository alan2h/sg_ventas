import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { CreateComponent } from 'src/app/pages/clients/create/create.component';
import { ListComponent } from 'src/app/pages/clients/list/list.component';


const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'create',
      component: CreateComponent
    },
    {
      path: 'list',
      component: ListComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }

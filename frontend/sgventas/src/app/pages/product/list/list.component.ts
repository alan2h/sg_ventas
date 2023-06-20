import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductList, Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsDialogComponent } from '../../shared/dialog-animations-dialog/dialog-animations-dialog.component';


interface Message {
  type:string,
  message:string
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  message: Message = {
    type: '',
    message: ''
  }

  open_view: boolean = false;

  list:ProductList = {
    count:    0,
    next:     null,
    previous: null,
    results:  []
  }

  obs: Subscription | null = null;

  search_field: string='name'
  search_value: string=''

 products:Product[] = []

  constructor(
    private product_service: ProductsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.obs?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
    this.route.queryParams.subscribe(
      params => { 
        if (params['type']){
          this.message.message = params['text'];
          this.message.type = params['type'];
        }
      })
  }

  loadData(){
    this.obs = this.product_service.getAll().subscribe(
      (data) => {
        this.list = data;
      }
    )
  }

  next(){
    this.product_service.getbyUrl(this.list.next).subscribe(data => {
      this.list = data;
    })
  }

  previous(){
    this.product_service.getbyUrl(this.list.previous).subscribe(data => {
      this.list = data;
    })
  }

  onDelete(id:number, name:string){
    const dialog = this.dialog.open(DialogAnimationsDialogComponent, {
      width: '250px',
      data: { id: id, name: name}
    })

    dialog.afterClosed().subscribe(result =>{
      console.log(result.id)
      this.product_service.deleteProduct(result.id).subscribe(data => {
        this.loadData();
      })
    })


  }

  closeView(resp:boolean){
    this.open_view = resp;
  }

  onView(){
    this.open_view = true;
  }

  edit(id:any){
    this.router.navigate(['/products/edit/', id])
  }

  searchProduct(){
    this.product_service.searchProduct(this.search_field, this.search_value).subscribe(data => {
      console.log(data);
      this.list = data;
    })
  }

}

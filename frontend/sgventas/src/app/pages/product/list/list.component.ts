import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductList, Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsDialogComponent } from '../../shared/dialog-animations-dialog/dialog-animations-dialog.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

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
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.obs?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { Message } from 'src/app/interfaces/message';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';

import { BrandsService } from '../../../services/products/brands.service';
import { Brand } from 'src/app/interfaces/brands.interface';
import { CategoriesService } from 'src/app/services/products/categories.service';
import { Category } from 'src/app/interfaces/products';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  brand_subscriptor: Subscription| undefined = undefined;
  category_subscriptor: Subscription|undefined = undefined;
  file = null;
  message: Message = {type:'', text:''}
  brands: Brand[] = [];
  categories: Category[] = [];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    barcode: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price_sale: new FormControl('', Validators.required),
    price_buy: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    stock_min: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  })

  fileName = '';

  onFileSelect(event:any){
    this.file = event.target.files[0];
  }

  constructor(
    private product_service: ProductsService,
    private router: Router,
    private brand_service: BrandsService,
    private category_service: CategoriesService,
    private _snackBar: MatSnackBar
  ) { }

  get name() { return this.form.get('name') }
  get barcode() { return this.form.get('barcode') }
  get description(){ return this.form.get('description') }
  get price_sale(){ return this.form.get('price_sale') }
  get price_buy(){ return this.form.get('price_buy') }
  get stock(){ return this.form.get('stock') }
  get stock_min(){ return this.form.get('stock_min') }
  get brand(){ return this.form.get('brand') }
  get category(){ return this.form.get('category') }

  ngOnInit(): void {
    this.brand_subscriptor = this.brand_service.get_brands_no_paginated().subscribe(
      (data)=>{ this.brands = data }
    )
    this.category_subscriptor = this.category_service.get_brands_no_paginate().subscribe(
      (data)=> {this.categories = data}
    )
  }

  ngOnDestroy(): void {
    this.brand_subscriptor?.unsubscribe()
    this.category_subscriptor?.unsubscribe()
  }

  onSubmit(){
    console.log(this.form.value)
    if (this.form.valid){
      
      let formData = new FormData();
      formData.append('name', this.form.get('name')?.value!);
      formData.append('barcode', this.form.get('barcode')?.value!);
      formData.append('description', this.form.get('description')?.value!);
      formData.append('price_sale', this.form.get('price_sale')?.value!);
      formData.append('price_buy', this.form.get('price_buy')?.value!);
      formData.append('stock', this.form.get('stock')?.value!);
      formData.append('stock_min', this.form.get('stock_min')?.value!);
      formData.append('brand', this.form.get('brand')?.value!);
      formData.append('category', this.form.get('category')?.value!);
      if (this.file){
        formData.append('photo', this.file);
      }
      this.product_service.setProduct(formData).subscribe(
        (data)=>{
          this._snackBar.open('Producto agregado con exito', 'cerrar')
          this.router.navigate(['/products/list'])          
        }
      )
    }else{
      this.form.markAllAsTouched()
      this.message.type = 'danger'
      this.message.text = 'Existen errores en el formulario.'
    }
  }

}

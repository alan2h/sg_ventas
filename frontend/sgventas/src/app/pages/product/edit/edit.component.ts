import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService  } from 'src/app/services/products/categories.service'
import { BrandsService } from 'src/app/services/products/brands.service';
import { Observable, Subscription } from 'rxjs';
import { Brand } from 'src/app/interfaces/brands.interface';
import { Category } from 'src/app/interfaces/products';


interface Message {
  type: string,
  text: string
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  message: Message = {
    type: '',
    text: ''
  }

  id: any;
  img_product: string = '';
  obs: Subscription | undefined = undefined;
  subscription_brands: Subscription | undefined = undefined;
  subscription_categories: Subscription | undefined = undefined;
  brands: Brand[] = [];
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private product_service: ProductsService,
    private brand_service: BrandsService,
    private category_service: CategoriesService,
    private _snackBar: MatSnackBar
  ) { }


  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price_sale: new FormControl(0, Validators.required),
    price_buy: new FormControl(0, Validators.required),
    stock: new FormControl(0, Validators.required),
    stock_min: new FormControl(0, Validators.required),
    brand: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  })

  get name(){ return this.form.get('name') }
  get description(){ return this.form.get('description') }
  get price_sale(){ return this.form.get('price_sale') }
  get price_buy(){ return this.form.get('price_buy') }
  get stock(){ return this.form.get('stock') }
  get stock_min(){ return this.form.get('stock_min') }
  get brand(){ return this.form.get('brand') }
  get category(){ return this.form.get('category') }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.loadData(this.id);
    })
    this.subscription_brands = this.brand_service.get_brands_no_paginated().subscribe(
      data => this.brands = data
    )
    this.subscription_categories = this.category_service.get_brands_no_paginate().subscribe(
      data => this.categories = data
    )
  }

  loadData(id:any){
    this.product_service.getOne(id).subscribe(data => {
      console.log(data);
       this.img_product = data.photo;
       this.form.controls.name.setValue(data.name);
       this.form.controls.description.setValue(data.description);
       this.form.controls.price_sale.setValue(parseFloat(data.price_sale));
       this.form.controls.price_buy.setValue(parseFloat(data.price_buy));
       this.form.controls.stock.setValue(data.stock);
       this.form.controls.stock_min.setValue(data.stock_min);
       this.form.controls.brand.setValue(data.brand.id.toString());
       this.form.controls.category.setValue(data.category.id.toString());
    })
  }

  onSubmit(){
    if (this.form.valid){
      let formData = new FormData();
      let price_sale = this.form.get('price_sale')?.value;
      let price_buy = this.form.get('price_buy')?.value;
      let stock = this.form.get('stock')?.value;
      let stock_min = this.form.get('stock_min')?.value;
      
      formData.append('name', this.form.get('name')?.value!);
      formData.append('description', this.form.get('description')?.value!);
      formData.append('brand', this.form.get('brand')?.value!);
      formData.append('category', this.form.get('category')?.value!);

      if (price_sale) formData.append('price_sale', price_sale.toString());
      if (price_buy) formData.append('price_buy', price_buy.toString());
      if (stock) formData.append('stock', stock.toString());
      if (stock_min) formData.append('stock_min', stock_min.toString());
      this.product_service.updateProduct(this.id, formData).subscribe(data => {
        //this.router.navigate(['/products/list'], {queryParams: {
        //  'type': 'success',
        //  'text': 'producto guardado con exito.'
        //}})
        this._snackBar.open('Se edito el producto', 'cerrar')
        this.router.navigate(['/products/list'])         
      })
    }else{
      this.message.type = 'danger';
      this.message.text = 'Existe un error en el formulario, no se puede guardar.'
    }
  }
}


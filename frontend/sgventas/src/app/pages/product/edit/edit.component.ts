import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductsService } from 'src/app/services/products.service';
import { Observable, Subscription } from 'rxjs';


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

  constructor(
    private route: ActivatedRoute,
    private product_service: ProductsService
  ) { }


  form = new FormGroup({
    
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price_sale: new FormControl(0),
    price_buy: new FormControl(0),
    stock: new FormControl(0),
    stock_min: new FormControl(0),

  })


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.loadData(this.id);
    })
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
      if (price_sale) formData.append('price_sale', price_sale.toString());
      if (price_buy) formData.append('price_buy', price_buy.toString());
      if (stock) formData.append('stock', stock.toString());
      if (stock_min) formData.append('stock_min', stock_min.toString());
      this.product_service.updateProduct(this.id, formData).subscribe(data => {
         
      })
    }else{
      this.message.type = 'danger';
      this.message.text = 'Existe un error en el formulario, no se puede guardar.'
    }
  }
}


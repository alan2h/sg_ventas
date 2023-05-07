import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price_sale: new FormControl(''),
    price_buy: new FormControl(''),
    stock: new FormControl(''),
    stock_min: new FormControl(''),
  })

  constructor(
    private product_service: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.form.valid){
      let formData = new FormData();
      formData.append('name', this.form.get('name')?.value!);
      formData.append('description', this.form.get('description')?.value!);
      formData.append('price_sale', this.form.get('price_sale')?.value!);
      formData.append('price_buy', this.form.get('price_buy')?.value!);
      formData.append('stock', this.form.get('stock')?.value!);
      formData.append('stock_min', this.form.get('stock_min')?.value!);
      this.product_service.setProduct(formData).subscribe(
        (data)=>{
          this.router.navigate(['/products/list'])          
        }
      )
    }else{

    }
  }

}

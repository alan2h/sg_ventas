import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryPagination } from 'src/app/interfaces/brands.interface';
import { Category } from 'src/app/interfaces/sales.interface';
import { Subscription } from 'rxjs'; 
import { CategoriesService } from 'src/app/services/products/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  subs_categories: Subscription | undefined = undefined;  

  categories: Category[] = [];

  category_pagination: CategoryPagination | undefined = undefined;

  name:string = '';
  constructor(
    private category_service: CategoriesService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnDestroy(): void {
    this.subs_categories?.unsubscribe();
  }

  onSubmit(){
    let form = new FormData();
    form.append('name', this.name)
    if (this.name){
      this.category_service.set_category(form).subscribe(data => {
        this._snackBar.open('Categoria agregado con exito', 'cerrar')
        this.loadData();
      })
    }
  }

  loadData(){
    this.subs_categories = this.category_service.get_categories().subscribe(data => {
      this.category_pagination = data;
      this.categories = this.category_pagination.results;
    })
  }

  ngOnInit(): void {
    this.loadData()
  }

}
